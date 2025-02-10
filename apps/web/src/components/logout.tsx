"use client"

import { redirect } from "next/navigation"

import { signOut } from "@solistack/auth/client"

export const Logout = () => {
  async function handleLogout() {
    await signOut()

    redirect("/login")
  }

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  )
}
