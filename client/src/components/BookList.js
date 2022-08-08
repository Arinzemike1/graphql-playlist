import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {

  const [selected, setSelected] = useState(null);
  const { data, loading } = useQuery(getBooksQuery);

  return (
    <div>
      <ul id="book-list">
        {
          loading ? <p>Loading...</p> :
            data.books.map((book) => {
              return (
                <li key={book.id} onClick={() => setSelected(book.id)}>{book.name}</li>
              )
            })
        }
      </ul>
      <BookDetails bookId={selected} />
    </div>
  )
}

export default BookList
