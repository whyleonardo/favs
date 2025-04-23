import { env } from "@grek/env/web"

import Stripe from "stripe"

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
})
