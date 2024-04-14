'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client'

import { useAuth } from '~/context/authContext'
import { LOGIN_MUTATION, REGISTER_MUTATION } from '~/graqhql/auth'
import BasicForm from './BasicForm'

export const LoginForm = (): JSX.Element => {
  const { setUpToken } = useAuth()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const client = useApolloClient()
  const router = useRouter()

  const handleSubmit = async (email: string, password: string) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      })
      if (errors !== undefined) {
        console.error(errors)
        setErrorMsg('登入失敗')
      } else if (data?.tokenAuth?.token !== undefined) {
        setUpToken(data.tokenAuth.token)
        router.push('/')
      }
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
  const router = useRouter()
  const client = useApolloClient()

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (email: string, password: string) => {
    try {
      const { errors } = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: { email, password },
      })
      if (errors !== undefined) {
        console.error(errors)
        setErrorMsg('註冊失敗')
        return
      }
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
