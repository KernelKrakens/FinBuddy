'use client'

import { useEffect, createContext, useContext, useState } from 'react'

type AuthContextType = {
  token: string | null
  setUpToken: (token: string) => void
  removeToken: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null)

  const setUpToken = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
  }
  const removeToken = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
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
