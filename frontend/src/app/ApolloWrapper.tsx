'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { parsedEnv } from '~/lib/processEnv'

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: parsedEnv.BACKEND_URI + '/graphql/',
    fetchOptions: { cache: 'no-store' },
  })

  const authLink = setContext((_, { headers }) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null

    return {
      headers: {
        ...headers,
        authorization: token !== null ? `JWT ${token}` : '',
      },
    }
  })

  const link = ApolloLink.from([
    authLink,
    ...(typeof window === 'undefined' ? [new SSRMultipartLink()] : []),
    httpLink,
  ])

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
