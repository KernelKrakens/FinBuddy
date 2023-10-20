import { useState } from 'react'
import { Button } from '~/components/ui/button'

const HelloWorld = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello world!</h1>
      <Button
        onClick={() => {
          setCount((count) => count + 1)
        }}
      >
        You clicked {count} times
      </Button>
    </div>
  )
}

export default HelloWorld
