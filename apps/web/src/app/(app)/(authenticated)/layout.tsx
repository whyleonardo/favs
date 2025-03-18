import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VERCEL_ENV_PROD } from "@/constants/common"
import { ColorsWidget } from "@/features/app-colors/components/colors-widget"
import { Clipboard } from "@/features/clipboard/components/clipboard"

interface AuthenticatedLayoutProps {
  children: ReactNode
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <SidebarProvider open={false}>
      <AppSidebar />
      <main className="min-h-screen w-full p-2">
        {children}
        <SidebarTrigger className="absolute bottom-4 left-4 size-10 rounded-full transition-colors" />
        <Clipboard />

        {!VERCEL_ENV_PROD && <ColorsWidget />}
      </main>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
