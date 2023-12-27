import React, { useState, useEffect, useRef } from 'react';
import { useModelProperty } from "../js/useModelProperty";
import { DetailsView } from "../views/detailsView.js";
import { promiseNoData } from '../js/Promise';
import '../App.css';

export function DetailsPresenter(props) {
  const [more, setMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [isBookAddedToList, setIsBookAddedToList] = useState(false); 

  const currentBook = useModelProperty(props.model, "currentBook");
  const currentBookDetails = useModelProperty(props.model, "currentBookDetails");
  const error = useModelProperty(props.model, "currentBookError");
  const user = useModelProperty(props.model, "user");
  const collections = useModelProperty(props.model, "collections");
  const bookAddedRef = useRef(false); 

  useEffect(() => {
    if (props.bookId) {
      props.model.setCurrentBook(props.bookId);
    }
  }, [props.bookId, props.model]);



  useEffect(() => {
    setIsBookAddedToList(
      collections[selectedCollection]?.some((book) => book.id === currentBook)
    );
  }, [selectedCollection, collections, currentBook]);

 

  const bookAdded = (bookDetails) => {
    if (bookAddedRef.current) {
      return;  
    }

    const collectionToAddTo = selectedCollection || "Quick Add";
    const isBookInCollection = collections[collectionToAddTo]?.some(book => book.id === bookDetails.id);
    
    if (!isBookInCollection) {
      try {
        props.model.addToCollection(bookDetails, collectionToAddTo);
        setShowAddedPopup(true);
        setIsBookAddedToList(true);
        bookAddedRef.current = true;  // Sätt ref till true när boken har lagts till
      } catch (error) {
        console.error("Error adding book to collection:", error);
      }
    } else {
      console.log(`Book with id ${bookDetails.id} is already in the collection ${collectionToAddTo}`);
    }
  };

  useEffect(() => {
    if (selectedCollection && currentBookDetails && !bookAddedRef.current) {
      bookAdded(currentBookDetails);
    }
    return () => {
      bookAddedRef.current = false;
    };
  }, [selectedCollection, currentBookDetails]);

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const showAddToCollectionPopup = () => {
    setShowPopup(true);
  };
  
  useEffect(() => {
    if (showAddedPopup) {
      const timer = setTimeout(() => {
        setShowAddedPopup(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showAddedPopup]);

  const loadingOrError = promiseNoData(currentBook, currentBookDetails, error);
  if (loadingOrError) {
    return loadingOrError;
  }

  return (
    <>
      <DetailsView
        readMore={more}
        book={currentBookDetails}
        login={user ? true : false}
        isBookInList={collections[selectedCollection]?.find((book) => book.id === currentBook)}
        setReadMore={() => setMore(!more)}
        bookAdded={bookAdded}
        collections={Object.keys(collections)}
        selectedCollection={selectedCollection}
        onSelectCollection={handleShowPopup}
        showAddToCollectionPopup={showAddToCollectionPopup}
        isBookAddedToList={isBookAddedToList}
      />
      {showPopup && (
        <div className="popup1">
          Choose a Collection:
          <ul>
            {Object.keys(collections).map((collection) => (
              <li key={collection}>
                <button
                  onClick={() => handleSelectCollection(collection)}
                  style={{ cursor: 'pointer' }}
                >
                  {collection}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showAddedPopup && (
        <div className="popup1">
          The book has succefully been added to your Collection: {" "} 
          <span style={{ color: 'brown' }}>{selectedCollection}</span>
        </div>
      )}
    </>
  );
}

export default DetailsPresenter;
