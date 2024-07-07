'use client'

import { useEffect, createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

type AuthContextType = {
  token: string | null
  setUpToken: (token: string) => void
  removeToken: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null)

  const setUpToken = (token: string) => {
    Cookies.set('token', token, { expires: 7 })
    setToken(token)
  }
  const removeToken = () => {
    Cookies.remove('token')
    setToken(null)
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (token !== undefined) {
      setToken(token)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, setUpToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) as AuthContextType
