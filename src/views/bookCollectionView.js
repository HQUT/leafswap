import React from 'react';
import { Link } from 'react-router-dom';


const BookCollection = ({ books }) => {
  return (
    <div className="book-collection">
      {books.map(book => (
        <Link key={book.id} to={`/books/${book.id}`} className="book-item">
          <img src={book.cover} alt={book.title} />
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.author}</div>
        </Link>
      ))}
    </div>
  );
};

export default BookCollection;
