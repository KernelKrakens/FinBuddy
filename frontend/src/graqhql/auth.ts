import { gql } from '~/__generated__/gql'

export const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`)

export const REGISTER_MUTATION = gql(`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`)
