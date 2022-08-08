import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {

    const { data, loading } = useQuery(getAuthorsQuery);
    const [bookMutation] = useMutation(addBookMutation);
    const [state, setState] = useState('');

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitForm = (e) => {
        e.preventDefault();
        bookMutation({
            variables: {
                name: state.name,
                genre: state.genre,
                authorId: state.authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label htmlFor="">Book name:</label>
                <input type="text" name="name" onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="">Genre:</label>
                <input type="text" name="genre" onChange={handleChange} />
            </div>

            <div className="field">
                <label htmlFor="">Author:</label>
                <select name="authorId" onChange={handleChange}>
                    <option value="Select author" defaultValue>Select author</option>
                    {
                        loading ? <option disabled>Loading authors...</option> :
                            data.authors.map((author) => {
                                return (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                );
                            })
                    }
                </select>
            </div>


            <button type='submit'>+</button>
        </form>
    )
}

export default AddBook