import React from "react";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";

export function HomeResultsView(props) {
  const { searchResults, bookChosen, settings } = props;

  const navigateToDetails = (id) => {
    bookChosen(id);
    // Du kan även navigera till detaljsidan här om du har React Router implementerat
    // Exempel: history.push("/details");
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {searchResults !== null &&
          searchResults.map((book) => (
            <div key={book.id}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                onClick={() => navigateToDetails(book.id)}
                alt=""
                className="home-book"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
