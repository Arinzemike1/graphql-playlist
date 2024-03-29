import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

export const getSingleBookQuery = gql`
  query($id: ID){
    book(id: $id) {
        id
        genre
        name
        author {
            id
            name
            age
            books{
                name
                id
            }
        }
    }
  }
`

export const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
      addBook(name: $name, genre: $genre, authorId: $authorId){
          name
          id
          genre
      }
  }
`