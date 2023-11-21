'use client'

import { gql } from '@apollo/client'
import {
  useQuery,
  useSuspenseQuery,
} from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

const GET_DOG_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

const dogPhotoSchema = z.object({
  dog: z.object({
    id: z.string(),
    displayImage: z.string(),
  }),
})

const ClientDemoPage = () => {
  const [breed, setBreed] = useState('affenpinscher')
  const { data, loading, error, refetch } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
  })
  // useSuspenseQuery(GET_DOG_PHOTO, {
  //   variables: { breed },
  // })

  const parsedData = dogPhotoSchema.safeParse(data)

  return (
    <div className="flex flex-col gap-4">
      <Select
        value={breed}
        onValueChange={(value) => {
          setBreed(value)
        }}
      >
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select a dog breed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="affenpinscher">affenpinscher</SelectItem>
          <SelectItem value="african">african</SelectItem>
          <SelectItem value="airedale">airedale</SelectItem>
          <SelectItem value="akita">akita</SelectItem>
        </SelectContent>
      </Select>
      {loading && <div>Loading dog breed...</div>}
      {parsedData.success && (
        <>
          <div>
            <Image
              src={data.dog.displayImage}
              width={0}
              height={0}
              alt={`${breed} image`}
              sizes="50vw"
              className="h-auto w-32"
            />
          </div>
          <div>
            <Button onClick={async () => await refetch()}>Refetch!</Button>
          </div>
        </>
      )}
    </div>
  )
}
export default ClientDemoPage
