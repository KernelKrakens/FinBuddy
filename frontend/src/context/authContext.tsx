'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useLazyQuery } from '@apollo/client'

import { gql } from '~/__generated__/gql'

type User = {
  email: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
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
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const [
    mutateFunction,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useMutation(LOGIN_MUTATION)
  const [
    queryUser,
    { data: userData, error: userError, loading: userLoading },
  ] = useLazyQuery(USER_QUERY)

  const login = async (email: string, password: string): Promise<void> => {
    await mutateFunction({ variables: { email, password } })
    if (loginError !== undefined) {
      throw new Error(loginError.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
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

  // crendential check
  useEffect(() => {
    getCredential()
  }, [getCredential])

  useEffect(() => {
    if (token !== null) {
      router.push('/')
    } else {
      router.push('/login')
    }
  }, [token, router])

  useEffect(() => {
    if (token !== null && user === null) {
      void queryUser()
    }
  }, [token, queryUser, user])

  useEffect(() => {
    if (userData?.userInfo?.email !== undefined && user === null) {
      setUser(userData.userInfo)
    }
  }, [userData, user])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) as AuthContextType
