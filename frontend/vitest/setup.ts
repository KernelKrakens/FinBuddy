import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

type Matchers = typeof matchers
declare module 'vitest' {
  interface Assertion extends Matchers {}
}

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
