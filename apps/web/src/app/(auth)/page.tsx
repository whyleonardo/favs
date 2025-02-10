import { redirect } from "next/navigation"

import { Logout } from "@/components/logout"
import { api } from "@/http/client"
import { getCurrentUser } from "@/lib/auth/server"

const AppPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const response = await api
    .get("links", {
      method: "GET",
    })
    .json()

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(response, null, 2)}</pre>

      <Logout />
    </div>
  )
}

export default AppPage
