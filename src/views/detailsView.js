import React, { useState, useEffect } from 'react';
import { getBookDetails } from '../js/bookSource'; // Replace with the actual path to your API module

function DetailView({ bookId }) {
    const [bookDetails, setBookDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (bookId) {
            getBookDetails(bookId)
                .then(details => {
                    setBookDetails(details);
                })
                .catch(err => {
                    setError(`Error fetching details: ${err.message}`);
                });
        }
    }, [bookId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-details">
            <h2>{bookDetails.volumeInfo.title}</h2>
            {/* Display other details like authors, description, etc. */}
            {bookDetails.volumeInfo.authors && (
                <p>Authors: {bookDetails.volumeInfo.authors.join(', ')}</p>
            )}
            {bookDetails.volumeInfo.description && <p>{bookDetails.volumeInfo.description}</p>}
            {bookDetails.volumeInfo.imageLinks && bookDetails.volumeInfo.imageLinks.thumbnail && (
                <img src={bookDetails.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${bookDetails.volumeInfo.title}`} />
            )}
        </div>
    );
}

export default DetailView;
