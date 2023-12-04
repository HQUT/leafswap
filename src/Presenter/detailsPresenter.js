import React, { useState } from 'react';
import DetailView from '../views/detailsView';

export function DetailsPresenter(props) {
    const [selectedBookId, setSelectedBookId] = useState(null);

    const handleBookClick = (bookId) => {
        setSelectedBookId(bookId);
    };

    return (
        <div>
            {props.books.map(book => (
                <img 
                    key={book.id}
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Cover of ${book.volumeInfo.title}`}
                    onClick={() => handleBookClick(book.id)}
                />
            ))}
            {selectedBookId && <DetailView bookId={selectedBookId} />}
        </div>
    );
}

