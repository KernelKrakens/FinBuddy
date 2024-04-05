'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useApolloClient } from '@apollo/client'

import { gql } from '~/__generated__/gql'
import type { UserQuery } from '~/__generated__/graphql'

type AuthContextType = {
  user: UserQuery['userInfo'] | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`)

const REGISTER_MUTATION = gql(`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`)

const USER_QUERY = gql(`
  query User {
    userInfo {
      email
    }
  }
`)

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const client = useApolloClient()
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserQuery['userInfo'] | null>(null)

  const [
    loginMutateFunction,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useMutation(LOGIN_MUTATION)
  const [registerMutateFunction, { error: registerError }] =
    useMutation(REGISTER_MUTATION)

  const login = async (email: string, password: string): Promise<void> => {
    await loginMutateFunction({ variables: { email, password } })
    if (loginError !== undefined) {
      throw new Error(loginError.message)
    }
  }

  const register = async (email: string, password: string): Promise<void> => {
    await registerMutateFunction({ variables: { email, password } })
    if (registerError !== undefined) {
      throw new Error(registerError.message)
    }
  }

  const logout = async () => {
    await client.resetStore()
    await client.clearStore()
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const getCredential = useCallback(() => {
    if (typeof localStorage.getItem('token') === 'string') {
      setToken(localStorage.getItem('token'))
    }
    if (
      typeof loginData?.tokenAuth?.token === 'string' &&
      !loginLoading &&
      loginError === undefined
    ) {
      localStorage.setItem('token', loginData.tokenAuth.token)
      setToken(loginData.tokenAuth.token)
    }
  }, [loginData, loginLoading, loginError])

  const getUser = useCallback(async () => {
    if (token !== null) {
      try {
        const { data } = await client.query({
          query: USER_QUERY,
          fetchPolicy: 'network-only',
        })
        if (data?.userInfo !== null) {
          setUser(data.userInfo)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
  }, [client, token])

  useEffect(() => {
    getCredential()
  }, [getCredential])

  useEffect(() => {
    void getUser()
  }, [getUser])

  useEffect(() => {
    if (token !== null) {
      router.push('/')
    } else {
      router.push('/login')
    }
  }, [token, router])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) as AuthContextType
