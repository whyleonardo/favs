import type { ReactNode } from "react"

import type { Viewport } from "next/types"

import { ThemeProvider } from "next-themes"

import { env } from "@grek/env/web"

import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/providers/query-provider"
import { fontMono, fontSans } from "@/styles/fonts"
import "@/styles/globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {env.VERCEL_ENV !== "production" && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body vaul-drawer-wrapper="" className={cn(fontSans, fontMono)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>
            {children}

            <Toaster richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
