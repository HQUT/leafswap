import React, { useState } from 'react';
import { useModelProperty } from "../js/useModelProperty";
import { DetailsView } from "../views/detailsView.js";
import { promiseNoData } from '../js/Promise';
import '../App.css';

export function DetailsPresenter(props) {
  const [more, setMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const currentBook = useModelProperty(props.model, "currentBook");
  const currentBookDetails = useModelProperty(props.model, "currentBookDetails");
  const error = useModelProperty(props.model, "currentBookError");
  const user = useModelProperty(props.model, "user");
  const books = useModelProperty(props.model, "books");

  const bookAdded = (bookDetails) => {
    props.model.addToCollection(bookDetails);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

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
        isBookInList={books.find((book) => book.id === currentBook)}
        setReadMore={() => setMore(!more)}
        bookAdded={bookAdded}
      />
      {showPopup && <div className="popup1">Boken har lagts till i listan!</div>}
    </>
  );
}
