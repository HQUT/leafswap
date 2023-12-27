import React, { useState, useEffect, useMemo } from 'react';
import { useModelProperty } from '../js/useModelProperty';
import BookCollectionView from '../views/bookCollection';
import '../App.css';

export function BookCollectionPresenter(props) {
  const collections = useModelProperty(props.model, 'collections');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [deleteallPopup, setdeleteallPopup] = useState(false);
  const [deletedCollectionName, setDeletedCollectionName] = useState('');
  const [deltedbookPopup, setDeltedBookPopup] = useState(false);


  const booksInSelectedCollection = useMemo(() => {
    return selectedCollection ? collections[selectedCollection] : [];
  }, [collections, selectedCollection]);

  useEffect(() => {
    console.log("Böcker i vald samling:", booksInSelectedCollection);
  }, [booksInSelectedCollection]);

  useEffect(() => {
    if (selectedCollection && !collections[selectedCollection]) {
      setSelectedCollection('');
    }
  }, [collections, selectedCollection]);

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      if (collections[newCollectionName]) {
        setFeedbackMessage(<span style={{ color: 'red' }}>Collection with this name already exist.</span>);  
        setTimeout(() => {
            setFeedbackMessage(null);
          }, 1500);
      } else {
        props.model.createCollection(newCollectionName);
        setSelectedCollection(newCollectionName);
        setNewCollectionName('');
        setFeedbackMessage(<span style={{ color: 'green' }}>Collection "{newCollectionName}" has been Created.`</span>);  
        setTimeout(() => {
            setFeedbackMessage(null);
          }, 2200);
        }
    }
  };

  const removeBookFromCollection = async (bookId) => {
    try {
        const updatedCollections = await props.model.removeFromCollection(bookId);
        setSelectedCollection(updatedCollections[selectedCollection]);
        setDeltedBookPopup(true);
        setTimeout(() => {
            setDeltedBookPopup(false);
        }, 2000);
      } catch (error) {
        console.error("Error removing book from collection:", error.message);
      }
    };

  const handleDeleteAllBooks = async (collectionName) => {
    try {
        await props.model.deleteCollection(collectionName);
        setSelectedCollection(''); 
        setDeletedCollectionName(collectionName);
        setdeleteallPopup(true);
        setTimeout(() => {
            setdeleteallPopup(false);
          }, 2000);
      } catch (error) {
        console.error("Error deleting collection:", error.message);
      }
    };


  const handleSelectCollection = (collectionName) => {
    setSelectedCollection(collectionName);
  };

  return (
    <div>
      {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
      <BookCollectionView
        collections={collections} 
        selectedCollection={selectedCollection}
        setSelectedCollection={handleSelectCollection}
        removeBookFromCollection={removeBookFromCollection}
        handleDeleteAllBooks={handleDeleteAllBooks}
        newCollectionName={newCollectionName}
        setNewCollectionName={setNewCollectionName}
        handleCreateCollection={handleCreateCollection}
      />
      {deleteallPopup && (
        <div className="popup1">
          <h2>{`Collectionen "${deletedCollectionName}" has been deleted.`}</h2>
        </div>
      )}
      {deltedbookPopup && (
        <div className="popup1">
          <h2>{`Book has succefully been deleted.`}</h2>
        </div>
      )}
    </div>
  );
}

export default BookCollectionPresenter;
