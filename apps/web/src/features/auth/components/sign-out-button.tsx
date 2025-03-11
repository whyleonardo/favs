"use client"

import { Button } from "@/components/ui/button"
import { useSignOut } from "@/features/auth/api/use-sign-out"

import { LogOutIcon } from "lucide-react"

export const SignOutButton = () => {
  const { mutate } = useSignOut()

  async function handleLogout() {
    mutate()
  }

  return (
    <Button
      type="button"
      className="flex size-full h-10 items-center justify-center text-center"
      onClick={handleLogout}
    >
      <LogOutIcon className="mr-2 size-4" />
      Logout
    </Button>
  )
}
