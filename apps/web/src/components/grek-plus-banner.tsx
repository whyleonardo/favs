"use client"

import { stripeSubscription } from "@grek/auth/client"

import { Button } from "./ui/button"

export const GrekPlusBanner = () => {
  const handleClick = async () => {
    await stripeSubscription.upgrade({
      plan: "plus",
      successUrl: "/",
      cancelUrl: "/",
      annual: false,
      referenceId: "v4v29efdH76sQd0aZLpzfBWaDyUkIMhW",
    })
  }

  return (
    <div className="fixed inset-x-1/2 bottom-2 z-50 flex w-fit -translate-x-1/2 items-center justify-center rounded-full bg-teal-50 p-2 shadow-lg">
      <Button onClick={handleClick}>Hey</Button>
    </div>
  )
}
