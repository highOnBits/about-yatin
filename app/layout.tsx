import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yatin Kumar - Sr. Software Engineer",
  description: "Senior Software Engineer specializing in building impactful solutions through strong engineering, strategic thinking, and continuous learning. Expert in full-stack development and team leadership.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/images/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
