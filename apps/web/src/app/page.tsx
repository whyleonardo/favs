import { Login } from "@/components/login"
import { api } from "@/http/client"
import { getCurrentUser } from "@/lib/auth/server"

export default async function Home() {
  const user = await getCurrentUser()

  // const hey = await api
  //   .get("links", {
  //     method: "GET",
  //   })
  //   .json()

  return (
    <main>
      {/* <pre>{JSON.stringify(hey, null, 2)}</pre> */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Login user={!!user} />
    </main>
  )
}
