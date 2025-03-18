import { Inter } from "next/font/google"

import { GeistMono } from "geist/font/mono"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const fontSans = inter.variable
export const fontMono = GeistMono.variable
