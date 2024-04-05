'use client'

import { useAuth } from '~/context/authContext'
import BasicForm from './BasicForm'

export const LoginForm = (): JSX.Element => {
  const { login } = useAuth()

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password)
    } catch (error) {
      console.error(error)
    }
  }
  return <BasicForm handleSubmit={handleSubmit} />
}
export const RegisterForm = (): JSX.Element => {
  const handleSubmit = async (email: string, password: string) => {}
  return <BasicForm isRegister={true} handleSubmit={handleSubmit} />
}
