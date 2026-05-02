import { createSupabaseAdmin } from "./_lib/supabase.mjs";
import { createStripeClient, getBillingIntervalFromSubscription, toIsoFromUnix } from "./_lib/stripe.mjs";
import { env, json, methodNotAllowed } from "./_lib/utils.mjs";

async function logBillingEvent(supabaseAdmin, eventType, eventId, userId, payload) {
  try {
    await supabaseAdmin.from("billing_events").upsert({
      stripe_event_id: eventId,
      event_type: eventType,
      user_id: userId || null,
      payload
    });
  } catch (error) {
    console.warn("Unable to log billing event", error);
  }
}

async function findUserIdByCustomerId(supabaseAdmin, stripeCustomerId) {
  if (!stripeCustomerId) return "";
  const { data } = await supabaseAdmin
    .from("billing_customers")
    .select("user_id")
    .eq("stripe_customer_id", stripeCustomerId)
    .maybeSingle();
  return data?.user_id || "";
}

async function upsertCustomerMapping(supabaseAdmin, userId, stripeCustomerId) {
  if (!userId || !stripeCustomerId) return;
  await supabaseAdmin.from("billing_customers").upsert({
    user_id: userId,
    stripe_customer_id: stripeCustomerId
  });
}

async function syncSubscriptionRecord({ supabaseAdmin, stripe, stripeSubscriptionId, fallbackUserId = "" }) {
  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId, {
    expand: ["items.data.price"]
  });

  const customerId = typeof subscription.customer === "string"
    ? subscription.customer
    : subscription.customer?.id || "";

  let userId = subscription.metadata?.supabase_user_id || fallbackUserId || "";
  if (!userId) {
    userId = await findUserIdByCustomerId(supabaseAdmin, customerId);
  }

  if (!userId) {
    return { userId: "", subscription };
  }

  await upsertCustomerMapping(supabaseAdmin, userId, customerId);

  const status = subscription.status || "unknown";
  const record = {
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_price_id: subscription.items?.data?.[0]?.price?.id || "",
    billing_interval: getBillingIntervalFromSubscription(subscription),
    status,
    current_period_end: toIsoFromUnix(subscription.current_period_end),
    cancel_at_period_end: !!subscription.cancel_at_period_end,
    canceled_at: toIsoFromUnix(subscription.canceled_at),
    last_event_at: new Date().toISOString()
  };

  await supabaseAdmin.from("subscriptions").upsert(record, {
    onConflict: "stripe_subscription_id"
  });

  const planValue = ["active", "trialing"].includes(status) ? "premium" : "free";

  await supabaseAdmin
    .from("profiles")
    .update({
      plan: planValue,
      updated_at: new Date().toISOString()
    })
    .eq("id", userId)
    .neq("plan", "admin");

  return { userId, subscription };
}

export default async (req) => {
  if (req.method !== "POST") return methodNotAllowed();

  try {
    const stripe = createStripeClient();
    const supabaseAdmin = createSupabaseAdmin();
    const webhookSecret = env("STRIPE_WEBHOOK_SECRET");

    if (!webhookSecret) {
      return json({ error: "Variabile STRIPE_WEBHOOK_SECRET mancante." }, 500);
    }

    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return json({ error: "Firma webhook mancante." }, 400);
    }

    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    let resolvedUserId = "";

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const checkoutUserId = session.client_reference_id || session.metadata?.supabase_user_id || "";
        const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id || "";
        const stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id || "";

        resolvedUserId = checkoutUserId || "";
        await upsertCustomerMapping(supabaseAdmin, resolvedUserId, stripeCustomerId);

        if (stripeSubscriptionId) {
          const synced = await syncSubscriptionRecord({
            supabaseAdmin,
            stripe,
            stripeSubscriptionId,
            fallbackUserId: resolvedUserId
          });
          resolvedUserId = synced.userId || resolvedUserId;
        }
        break;
      }

      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const stripeSubscriptionId = typeof invoice.subscription === "string"
          ? invoice.subscription
          : invoice.subscription?.id || "";

        if (stripeSubscriptionId) {
          const synced = await syncSubscriptionRecord({
            supabaseAdmin,
            stripe,
            stripeSubscriptionId
          });
          resolvedUserId = synced.userId || "";
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object;
        const synced = await syncSubscriptionRecord({
          supabaseAdmin,
          stripe,
          stripeSubscriptionId: stripeSubscription.id,
          fallbackUserId: stripeSubscription.metadata?.supabase_user_id || ""
        });
        resolvedUserId = synced.userId || "";
        break;
      }

      default:
        break;
    }

    await logBillingEvent(supabaseAdmin, event.type, event.id, resolvedUserId, event.data.object);

    return json({ received: true });
  } catch (error) {
    console.error("stripe-webhook error", error);
    return json({ error: error.message || "Webhook Stripe non valido." }, 400);
  }
};
