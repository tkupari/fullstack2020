import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
mutation addBook($title: String! $author: String! $published: Int! $genres: [String!]!) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String! $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`
