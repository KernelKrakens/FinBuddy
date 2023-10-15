'use client'

import { Button } from '~/components/ui/button'

const Home = () => (
  <div>
    <Button>Default</Button>
    <Button variant="outline" className="bg-orange-500 hover:bg-orange-400">
      Button
    </Button>
  </div>
)

export default Home
