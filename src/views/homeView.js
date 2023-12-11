import React from "react";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";

export function HomeResultsView(props) {
  const { searchResults, settings, bookChosen } = props;

  return (
    <div className="container">
      <Slider {...settings}>
        {searchResults !== null &&
          searchResults.map((book) => (
            <div
              key={book.id}
              onClick={() => bookChosen(book.id)}// Använd bokChosen direkt här
              className="home-book-card"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || "defaultThumbnailUrl"}
                alt={book.volumeInfo.title}
                className="home-book"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
