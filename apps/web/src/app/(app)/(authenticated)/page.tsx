import { SignOutButton } from "@/features/auth/components/sign-out-button"
import { getSession } from "@/features/auth/server/get-session"
import { protectRoute } from "@/features/auth/server/protect-route"
import { LinksContainer } from "@/features/links/components/links-container"

export default async function Home() {
  const session = await getSession()

  if (!session) {
    protectRoute({ redirectUrl: "/login" })
  }

  return (
    <main>
      <SignOutButton />

      {/* <LinksContainer /> */}
    </main>
  )
}
