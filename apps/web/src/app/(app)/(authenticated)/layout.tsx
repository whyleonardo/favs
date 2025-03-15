import type { ReactNode } from "react"

import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { VERCEL_ENV_PROD } from "@/constants"
import { ColorsWidget } from "@/features/app-colors/components/colors-widget"
import { Clipboard } from "@/features/clipboard/components/clipboard"

interface AuthenticatedLayoutProps {
  children: ReactNode
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {children}

          <Clipboard />

          {!VERCEL_ENV_PROD && <ColorsWidget />}
        </main>
      </SidebarProvider>
    </>
  )
}

export default AuthenticatedLayout
