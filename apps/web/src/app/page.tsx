import { Login } from "@/components/login"
import { getCurrentUser } from "@/lib/auth/server"

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    return <Login />
  }

  return (
    <main>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}
