'use client'

import { useAuth } from '~/context/authContext'

const Home = () => {
  const { logout, user } = useAuth()
  return (
    <div className="my-2 flex flex-wrap gap-2">
      <h1 className="text-2xl">Welcome {user?.email}</h1>
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
