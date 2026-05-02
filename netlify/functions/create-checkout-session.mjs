import { createSupabaseAdmin, getAuthenticatedUser } from "./_lib/supabase.mjs";
import { createStripeClient, getStripePriceId } from "./_lib/stripe.mjs";
import { env, getAppUrl, json, methodNotAllowed } from "./_lib/utils.mjs";

async function getOrCreateStripeCustomer({ stripe, supabaseAdmin, userId, email, fullName, username }) {
  const { data: billingCustomer } = await supabaseAdmin
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (billingCustomer?.stripe_customer_id) {
    return billingCustomer.stripe_customer_id;
  }

  const customer = await stripe.customers.create({
    email,
    name: fullName || undefined,
    metadata: {
      supabase_user_id: userId,
      username: username || ""
    }
  });

  await supabaseAdmin.from("billing_customers").upsert({
    user_id: userId,
    stripe_customer_id: customer.id
  });

  return customer.id;
}

async function getExistingPremiumPortalUrl({ stripe, supabaseAdmin, userId, appUrl }) {
  const { data: latestSubscription } = await supabaseAdmin
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latestSubscription || !["active", "trialing", "past_due"].includes(latestSubscription.status)) {
    return "";
  }

  const { data: billingCustomer } = await supabaseAdmin
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!billingCustomer?.stripe_customer_id) {
    return "";
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: billingCustomer.stripe_customer_id,
    return_url: `${appUrl}/`
  });

  return portal.url || "";
}

async function resolvePromotionCode(stripe, code) {
  if (!code) return { promotionCodeId: "", error: "" };

  const promotionCodes = await stripe.promotionCodes.list({
    code,
    active: true,
    limit: 1
  });

  const promotionCode = promotionCodes?.data?.[0];
  if (!promotionCode?.id) {
    return { promotionCodeId: "", error: "Codice promozionale non valido o non attivo." };
  }

  return { promotionCodeId: promotionCode.id, error: "" };
}

export default async (req) => {
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const supabaseAdmin = createSupabaseAdmin();
    const stripe = createStripeClient();
    const appUrl = getAppUrl(req);

    const { user, error: authError } = await getAuthenticatedUser(req, supabaseAdmin);
    if (authError || !user) {
      return json({ error: authError || "Sessione non valida." }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const billingCycle = body?.billingCycle === "monthly" ? "monthly" : "annual";
    const promoCode = String(body?.promoCode || "").trim();

    const priceId = getStripePriceId(billingCycle);
    if (!priceId) {
      return json({ error: `Price ID Stripe mancante per il piano ${billingCycle}.` }, 500);
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id,email,username,full_name,plan,is_owner")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return json({ error: "Profilo utente non trovato." }, 404);
    }

    if (profile.plan === "admin" || profile.is_owner) {
      return json({ error: "La modalità Admin non ha bisogno di un checkout reale." }, 400);
    }

    const portalUrl = await getExistingPremiumPortalUrl({
      stripe,
      supabaseAdmin,
      userId: user.id,
      appUrl
    });

    if (portalUrl) {
      return json({
        code: "ALREADY_PREMIUM",
        error: "Esiste già un abbonamento attivo o in recupero.",
        portalUrl
      }, 409);
    }

    const customerId = await getOrCreateStripeCustomer({
      stripe,
      supabaseAdmin,
      userId: user.id,
      email: profile.email || user.email || "",
      fullName: profile.full_name || "",
      username: profile.username || ""
    });

    const { promotionCodeId, error: promoError } = await resolvePromotionCode(stripe, promoCode);
    if (promoError) {
      return json({ error: promoError }, 400);
    }

    const sessionParams = {
      mode: "subscription",
      customer: customerId,
      client_reference_id: user.id,
      success_url: `${appUrl}/?checkout=success`,
      cancel_url: `${appUrl}/?checkout=cancelled`,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        supabase_user_id: user.id,
        billing_cycle: billingCycle
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          billing_cycle: billingCycle
        }
      }
    };

    if (promotionCodeId) {
      sessionParams.discounts = [{ promotion_code: promotionCodeId }];
    } else {
      sessionParams.allow_promotion_codes = true;
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionParams);

    return json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id
    });
  } catch (error) {
    console.error("create-checkout-session error", error);
    return json({ error: error.message || "Impossibile creare il checkout Stripe." }, 500);
  }
};
