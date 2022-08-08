import React from 'react'
import { useQuery } from '@apollo/client';
import { getSingleBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
    const { data, loading } = useQuery(getSingleBookQuery, {
        variables: {
            id: bookId
        }
    });

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }
    else {
        const { book } = data;
        return (
            <div id="book-details">
                {
                    book ?
                    <div>
                        <h2>Book: {book.name}</h2>
                        <p>Book genre: {book.genre}</p>
                        <p>Author: {book.author.name}</p>

                        <p>All books by this author</p>
                        <ul className='other-books'>
                            {
                                book.author.books.map((item) => {
                                    return (
                                        <li key={item.id}>{item.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div> : 
                    <p>No books selected</p>
                }
            </div>
        )
    }
}

export default BookDetails