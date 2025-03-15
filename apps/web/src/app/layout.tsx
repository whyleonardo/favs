import type { ReactNode } from "react"

import type { Viewport } from "next/types"

import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/sonner"
import { ENABLE_REACT_SCAN, VERCEL_ENV_PROD } from "@/constants"
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
        {!VERCEL_ENV_PROD ||
          (ENABLE_REACT_SCAN && (
            <script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
            />
          ))}
      </head>
      <body vaul-drawer-wrapper="" className={cn(fontSans, fontMono)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
