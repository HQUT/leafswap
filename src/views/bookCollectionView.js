import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCollectionView = ({
  collections,
  selectedCollection,
  setSelectedCollection,
  removeBookFromCollection,
  handleDeleteAllBooks,
  newCollectionName,
  setNewCollectionName,
  handleCreateCollection,
}) => {

  
  

  const booksInCollection = collections && collections[selectedCollection]
    ? collections[selectedCollection]
    : [];

  return (
    <>
      <div>
        <input
        className="search"
          type="text"
          placeholder="Name.."
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
        <button className="btn" onClick={handleCreateCollection}> Create Collection </button>
      </div>

      {selectedCollection ? (
        <div className="collections-grid">
          <div
            className="collection-box selected"
            onClick={() => setSelectedCollection(null)}
          >
            <h3>{selectedCollection}</h3>
          </div>
        </div>
      ) : (
        <div className="collections-grid">
          {Object.keys(collections).map((collectionName) => (
            <div
              key={collectionName}
              className="collection-box"
              onClick={() => setSelectedCollection(collectionName)}
            >
              <h3>{collectionName}</h3>
            </div>
          ))}
        </div>
      )}
      {selectedCollection && booksInCollection.length > 0 && (
        <div className="book-collection">
          {booksInCollection.map((book) => (
            <div key={book.id} className="list">
              <Link to={`/details`}>
                {book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                )}
                <div>
                  <span>Title: </span>
                  {book.volumeInfo.title || 'Okänd titel'}
                </div>
                <div className="book-info">
                  <span>Author(S): </span>
                  {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Okänd författare'}
                </div>
              </Link>
              <button  className="btn" onClick={() => removeBookFromCollection(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {selectedCollection && booksInCollection.length === 0 && (
          <div>
        <h2 className="list">You selected Collection "{selectedCollection}" is Empty. Search and Add !</h2>
        
        <button className='home-button' onClick={() =>  handleDeleteAllBooks(selectedCollection)}>Delete Collection!</button>
        </div>
      )}

      {!selectedCollection && (
        <h2 className="list">Choose or Create a Collection !!</h2>
      )}
    </>
  );
};

export default BookCollectionView;
