import '@total-typescript/ts-reset'
import type { Metadata } from 'next'

import './globals.css'
import { ApolloWrapper } from '~/app/ApolloWrapper'

import { parsedEnv } from '~/lib/processEnv'
console.log(parsedEnv)

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
