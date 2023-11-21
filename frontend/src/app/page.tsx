'use client'

import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'

const Home = () => {
  return (
    <div className="my-2 flex flex-wrap gap-2">
      <Link href="/demo/server" className={buttonVariants()}>
        RSC + Apollo Client
      </Link>
      <Link
        href="/demo/client"
        className={buttonVariants({ variant: 'secondary' })}
      >
        Client component + Apollo Client
      </Link>
    </div>
  )
}

export default Home
