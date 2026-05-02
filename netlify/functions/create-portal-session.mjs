import { createSupabaseAdmin, getAuthenticatedUser } from "./_lib/supabase.mjs";
import { createStripeClient } from "./_lib/stripe.mjs";
import { getAppUrl, json, methodNotAllowed } from "./_lib/utils.mjs";

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

    const { data: billingCustomer } = await supabaseAdmin
      .from("billing_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!billingCustomer?.stripe_customer_id) {
      return json({ error: "Nessun cliente Stripe collegato a questo account." }, 404);
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: billingCustomer.stripe_customer_id,
      return_url: `${appUrl}/`
    });

    return json({ url: portal.url });
  } catch (error) {
    console.error("create-portal-session error", error);
    return json({ error: error.message || "Impossibile aprire il Customer Portal." }, 500);
  }
};
