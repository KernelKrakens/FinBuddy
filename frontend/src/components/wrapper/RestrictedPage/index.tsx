'use client'

import { useEffect } from 'react'

import { useAuth } from '~/context/authContext'
import { useRouter, usePathname } from 'next/navigation'

const PROTECTED_PATHS = ['/']
const UNPROTECTED_PATHS = ['/login', '/register']

type RestrictedPageProps = {
  children: React.ReactNode
}

const RestrictedPage = (props: RestrictedPageProps) => {
  const { children } = props

  const router = useRouter()
  const pathname = usePathname()
  const { token } = useAuth()

  const isRestrictedPath = PROTECTED_PATHS.includes(pathname)
  const isUnprotectedPath = UNPROTECTED_PATHS.includes(pathname)

  useEffect(() => {
    if (token === null && isRestrictedPath) {
      router.push('/login')
    }
    if (token !== null && isUnprotectedPath) {
      router.push('/')
    }
  }, [token, router, isRestrictedPath, isUnprotectedPath])

  if (token === null && isRestrictedPath) {
    return <div>Restricted</div>
  }
  if (token !== null && isUnprotectedPath) {
    return <div>Redirecting...</div>
  }
  return <>{children}</>
}

export default RestrictedPage
