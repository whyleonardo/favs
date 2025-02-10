"use client"

import { signIn, signOut } from "@solistack/auth/client"

export const Login = ({ user }) => {
  return (
    <>
      {!user ? (
        <button
          type="button"
          onClick={async () => {
            await signIn.social({
              provider: "github",
              callbackURL: "http://localhost:3000",
            })
          }}
        >
          Login
        </button>
      ) : (
        <button
          type="button"
          onClick={async () => {
            await signOut()
          }}
        >
          logout
        </button>
      )}
    </>
  )
}
