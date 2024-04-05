'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

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
      payload
      token
    }
  }
`)

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  const login = async (email: string, password: string) => {
    await mutateFunction({ variables: { email, password } })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (typeof localStorage.getItem('token') === 'string' && token === null) {
      setToken(localStorage.getItem('token'))
    }
    if (data !== null && !loading && error === undefined) {
      if (typeof data?.tokenAuth?.token === 'string') {
        localStorage.setItem('token', data.tokenAuth.token)
        setToken(data.tokenAuth.token)
      }
      if (typeof data?.tokenAuth?.payload?.email === 'string') {
        setUser(data.tokenAuth.payload.email)
      }
    }
  }, [data, loading, error, token])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) as AuthContextType
