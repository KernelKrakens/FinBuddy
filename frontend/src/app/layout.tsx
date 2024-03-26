import '@total-typescript/ts-reset'
import type { Metadata } from 'next'

import './globals.css'
import './globalicons.css'
import { ApolloWrapper } from '~/app/ApolloWrapper'

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
      <body id="app" className="container">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
