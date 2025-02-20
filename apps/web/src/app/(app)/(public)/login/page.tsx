import { SignInButton } from "@/features/auth/components/sign-in-button"
import { getSession } from "@/features/auth/server/get-session"
import { protectRoute } from "@/features/auth/server/protect-route"

export default async function Login() {
  const session = await getSession()

  if (session) {
    protectRoute({ redirectUrl: "/" })
  }

  return (
    <main>
      <div>Hello world!</div>
      <SignInButton />
    </main>
  )
}
