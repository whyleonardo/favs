import { SignOutButton } from "@/features/auth/components/sign-out-button"
import { getSession } from "@/features/auth/server/get-session"
import { protectRoute } from "@/features/auth/server/protect-route"

export default async function Home() {
  const session = await getSession()

  if (!session) {
    protectRoute({ redirectUrl: "/login" })
  }

  const tags = ["hey", "dc"]
  return (
    <main>
      <SignOutButton />
      {/* <LinkCard /> */}
      <br />

      <br />
    </main>
  )
}
