import { z } from 'zod'

const envSchema = z.object({
  BACKEND_URI: z.string(),
})

// export const parsedEnv = envSchema.parse({
//   BACKEND_URI:
//     process.env.NODE_ENV === 'development'
//       ? process.env.NEXT_PUBLIC_BACKEND_DEV_URI
//       : process.env.NEXT_PUBLIC_BACKEND_PROD_URI,
// })
export const parsedEnv = envSchema.parse({
  BACKEND_URI:
    process.env.NODE_ENV === 'development'
      ? 'https://71z1g.sse.codesandbox.io/'
      : process.env.NEXT_PUBLIC_BACKEND_PROD_URI,
})
