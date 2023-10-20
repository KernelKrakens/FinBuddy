import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

type Matchers = typeof matchers
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Assertion extends Matchers {}
}

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
