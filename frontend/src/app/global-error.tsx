'use client'

import { type ErrorProps } from '~/lib/types'

export default function GlobalError({ error, reset }: ErrorProps) {
  console.error(error)

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button
          onClick={() => {
            reset()
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
