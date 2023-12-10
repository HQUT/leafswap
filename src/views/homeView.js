import React from "react";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";
import { useNavigate } from "react-router-dom"; 

export function HomeResultsView(props) {
  const { searchResults, settings } = props;
  const navigate = useNavigate(); 

  const navigateToDetails = (id) => {
    navigate(`/details/${id}`); 
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
            </div>
          ))}
      </Slider>
    </div>
  );
}
