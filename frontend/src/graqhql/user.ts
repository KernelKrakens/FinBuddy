import { gql } from '~/__generated__/gql'

export const USER_QUERY = gql(`
  query User {
    userInfo {
      email
    }
  }
`)
