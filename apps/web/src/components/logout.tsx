"use client"

import { signOut } from "@solistack/auth/client"

export const Logout = () => {
  return (
    <button type="button" onClick={async () => signOut()}>
      Logout
    </button>
  )
}
