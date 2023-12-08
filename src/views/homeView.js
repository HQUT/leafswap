import React from "react";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";
import { useNavigate } from "react-router-dom"; // Importera useNavigate

export function HomeResultsView(props) {
  const { searchResults, settings } = props;
  const navigate = useNavigate(); // Skapa en instans av useNavigate

  const navigateToDetails = (id) => {
    navigate(`/details/${id}`); // Navigera till detaljsidan med bokens ID
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {searchResults !== null &&
          searchResults.map((book) => (
            <div key={book.id} onClick={() => navigateToDetails(book.id)} className="home-book-card">
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="home-book"
              />
              {/* Du kan lägga till ytterligare bokinformation här om du vill */}
            </div>
          ))}
      </Slider>
    </div>
  );
}
