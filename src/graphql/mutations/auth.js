import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
        role
        name
      }
    }
  }
`;


export const ME = gql`
  query Me {
    me {
      id
      email
      name
      role
      sellerStatus
    }
  }
`;



export const SIGNUP = gql `
mutation SignUp($name: String!, $email: String!, $password: String!) {
  register(input: { name: $name, email: $email, password: $password }) {
    token
    user {
      id
      email
      name
      role
      sellerStatus
    }
  }
}
`


export const refreshToken = gql `
mutation RefreshToken {
  refreshToken {
    token
  }
}
`


export const LOGOUT = gql `
mutation Logout {
  logout{
    success
    message
    }
}
`
