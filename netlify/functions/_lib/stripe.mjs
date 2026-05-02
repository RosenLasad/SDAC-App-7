import Stripe from "stripe";
import { env } from "./utils.mjs";

export function createStripeClient() {
  const secretKey = env("STRIPE_SECRET_KEY");
  if (!secretKey) {
    throw new Error("Variabile STRIPE_SECRET_KEY mancante.");
  }
  return new Stripe(secretKey);
}

export function getStripePriceId(billingCycle) {
  if (billingCycle === "monthly") {
    return env("STRIPE_PRICE_MONTHLY");
  }
  return env("STRIPE_PRICE_ANNUAL");
}

export function toIsoFromUnix(unixSeconds) {
  return unixSeconds ? new Date(unixSeconds * 1000).toISOString() : null;
}

export function getBillingIntervalFromSubscription(stripeSubscription) {
  const interval = stripeSubscription?.items?.data?.[0]?.price?.recurring?.interval || "";
  return interval === "year" ? "annual" : "monthly";
}
