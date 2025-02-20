import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/providers/query-provider"
import { fontMono, fontSans } from "@/styles/fonts"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={cn(fontSans, fontMono)}>
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body vaul-drawer-wrapper="">
        <QueryProvider>
          {children}

          <Toaster richColors theme="light" />
        </QueryProvider>
      </body>
    </html>
  )
}
