import type { ReactNode } from "react"

import { stripeSubscription } from "@grek/auth/client"

import { AppSidebar } from "@/components/app-sidebar/sidebar"
import { GrekPlusBanner } from "@/components/grek-plus-banner"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VERCEL_ENV_PROD } from "@/constants/common"
import { ColorsWidget } from "@/features/app-colors/components/colors-widget"
import { Clipboard } from "@/features/clipboard/components/clipboard"

interface AuthenticatedLayoutProps {
  children: ReactNode
}

const AuthenticatedLayout = async ({ children }: AuthenticatedLayoutProps) => {
  const list = await stripeSubscription.list()

  return (
    <SidebarProvider open={false}>
      <AppSidebar />
      <main className="min-h-screen w-full p-2">
        {children}

        <pre>{JSON.stringify(list, null, 2)}</pre>
        <SidebarTrigger
          variant="default"
          className="fixed bottom-2 left-2 size-10 rounded-full transition-colors"
        />
        <Clipboard />

        <GrekPlusBanner />

        {!VERCEL_ENV_PROD && <ColorsWidget />}
      </main>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
