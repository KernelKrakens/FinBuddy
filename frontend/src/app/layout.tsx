import '@total-typescript/ts-reset'
import type { Metadata } from 'next'

import './globals.css'
import './globalicons.css'
import { ApolloWrapper } from '~/app/ApolloWrapper'
import RestrictedPage from '~/components/wrapper/RestrictedPage'
import { AuthProvider } from '~/context/authContext'
import Navbar from '~/components/layout/Navbar'

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
      <body id="app">
        <ApolloWrapper>
          <AuthProvider>
            <Navbar />
            <RestrictedPage>{children}</RestrictedPage>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
