import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "VideoBox - Assista vídeos de forma distribuída",
  description: "Criado por Márcio, Ronal, Gabriela e Vinícius",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Header />
        <div className="flex min-h-[calc(100vh-140px)] w-full justify-center">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
