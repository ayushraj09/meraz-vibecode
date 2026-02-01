import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import ChatBot from '@/components/chatbot'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MERAZ 2026 | IIT Bhilai\'s Annual Festival',
  description: 'Join us for MERAZ 2026, the annual cultural and technical festival of IIT Bhilai. Experience 3 days of stellar events, cosmic performances, and unforgettable memories.',
  generator: 'v0.app',
  icons: {
    icon: '/meraz-logo.png',
    apple: '/meraz-logo.png',
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
        <ChatBot />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
