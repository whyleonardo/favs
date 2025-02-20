import type { ReactNode } from "react"

import { Clipboard } from "@/features/clipboard-history/components/clipboard"

interface AuthenticatedLayoutProps {
  children: ReactNode
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <>
      {children}

      <Clipboard />
    </>
  )
}

export default AuthenticatedLayout
