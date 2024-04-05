'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '~/context/authContext'
import BasicForm from './BasicForm'

export const LoginForm = (): JSX.Element => {
  const { login } = useAuth()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password)
    } catch (error) {
      console.error(error)
      setErrorMsg('登入失敗')
    }
  }
  return (
    <BasicForm
      handleSubmit={handleSubmit}
      errorMsg={errorMsg}
      resetErrorMsg={() => {
        setErrorMsg(null)
      }}
    />
  )
}
export const RegisterForm = (): JSX.Element => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const { register } = useAuth()

  const handleSubmit = async (email: string, password: string) => {
    try {
      await register(email, password)
      router.push('/login')
    } catch (error) {
      console.error(error)
      setErrorMsg('註冊失敗')
    }
  }
  return (
    <BasicForm
      isRegister={true}
      handleSubmit={handleSubmit}
      errorMsg={errorMsg}
      resetErrorMsg={() => {
        setErrorMsg(null)
      }}
    />
  )
}
