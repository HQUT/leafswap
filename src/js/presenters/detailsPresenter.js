import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsView } from '../views/detailsView';
import { promiseNoData } from "../js/promiseNoData.js";
import { useModelProperty } from '../js/useModelProperty';

export function DetailsPresenter(props) {
  const [more, setMore] = useState(false);
  const { id } = useParams(); // Hämta bokens ID från URL

  useEffect(() => {
    props.model.setCurrentBook(id); // Sätt den aktuella boken baserat på URL:ens ID
  }, [id, props.model]);

  const currentBookDetails = useModelProperty(props.model, "currentBookDetails");
  const error = useModelProperty(props.model, "currentBookError");
  const user = useModelProperty(props.model, "user");
  const books = useModelProperty(props.model, "books");

  const isBookInList = books.some(book => book.id === currentBookDetails.id); // Kontrollera om boken finns i listan

  const toggleReadMore = () => {
    setMore(!more);
  };

  const handleBookAdded = (bookDetails) => {
    props.model.addToList(bookDetails);
  };

  return (
    promiseNoData(id, currentBookDetails, error) || (
      <DetailsView
        readMore={more}
        book={currentBookDetails}
        login={!!user} // !! konverterar user till en boolean
        isBookInList={isBookInList}
        setReadMore={toggleReadMore}
        bookAdded={handleBookAdded}
      />
    )
  );
}
