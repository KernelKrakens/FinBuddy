'use client'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'

import { useAuth } from '~/context/authContext'
import { USER_QUERY } from '~/graqhql/user'

const Home = () => {
  const { data } = useQuery(USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  })
  const { removeToken } = useAuth()
  const router = useRouter()

  const logout = () => {
    removeToken()
    router.push('/login')
  }

  return (
    <div className="my-2 flex flex-wrap gap-2">
      <h1 className="text-2xl">Welcome {data?.userInfo?.email}</h1>
      <button
        onClick={logout}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Logout
      </button>
    </div>
  )
}

export default Home
