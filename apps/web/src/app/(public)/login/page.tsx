import { redirect } from "next/navigation"

import { Login } from "@/components/login"
import { getCurrentUser } from "@/lib/auth/server"

const LoginPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    redirect("/")
  }

  return <Login />
}

export default LoginPage
