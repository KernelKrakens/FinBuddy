'use client'

import { useQuery } from '@apollo/client'

import { useAuth } from '~/context/authContext'
import { USER_QUERY } from '~/graqhql/user'

const Home = () => {
  const { data } = useQuery(USER_QUERY)
  const { removeToken } = useAuth()

  return (
    <div className="my-2 flex flex-wrap gap-2">
      <h1 className="text-2xl">Welcome {data?.userInfo?.email}</h1>
      <button
        onClick={removeToken}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Logout
      </button>
    </div>
  )
}

export default Home
