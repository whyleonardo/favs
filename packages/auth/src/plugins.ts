import { stripe } from "@better-auth/stripe"

import { env } from "@grek/env/web"
import { stripeClient } from "@grek/payment"

import { openAPI } from "better-auth/plugins"

export const openAPIPlugin = openAPI({
  path: "/docs",
})

export const stripePlugin = stripe({
  stripeClient,
  stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
  createCustomerOnSignUp: true,
  subscription: {
    enabled: true,
    plans: [
      {
        name: "basic",
        priceId: "price_1RH86OGf4LGtDdcy9vZUih3x",
      },
      {
        name: "plus",
        priceId: "price_1RH7sNGf4LGtDdcyUZJsAatU",
        annualDiscountPriceId: "price_1RH7uSGf4LGtDdcy1Rxw4NQr",
        freeTrial: {
          days: 7,
        },
      },
    ],
  },
})
