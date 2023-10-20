import '@total-typescript/ts-reset'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'FinBuddy',
  description: 'A playground of Django and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="app">{children}</body>
    </html>
  )
}
