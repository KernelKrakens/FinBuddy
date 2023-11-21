import { gql } from '@apollo/client'
import { z } from 'zod'
import { getClient } from '~/lib/apollo-client'

const dogsQuery = gql`
  {
    dogs {
      id
      breed
    }
  }
`

const dogsSchema = z.object({
  dogs: z.array(
    z.object({
      id: z.string(),
      breed: z.string(),
    })
  ),
})

// RSC demo > using `getClient`
const ServerDemoPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const { data } = await getClient().query({ query: dogsQuery })

  console.log(data)
  const parsedData = dogsSchema.parse(data)

  return (
    <div>
      <h1 className="text-2xl font-bold">List of dog breed</h1>
      <ul className="pl-4">
        {parsedData.dogs.map((dog) => (
          <li key={dog.id}>{dog.breed}</li>
        ))}
      </ul>
    </div>
  )
}
export default ServerDemoPage
