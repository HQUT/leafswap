import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Lägg till denna import
import { usePromise } from "../js/usePromise.js";
import { promiseNoData } from "../js/promiseNoData.js";
import { HomeResultsView } from "../views/homeView";
import { BookSource } from "../js/bookSource.js";

export function HomePresenter(props) {
  const [myPromise, setPromise] = useState(null);
  const [myPromise2, setPromise2] = useState(null);
  const navigate = useNavigate(); // Skapa en instans av useNavigate

  useEffect(() => {
    setPromise(BookSource.searchBooksByName("Fiction"));
    setPromise2(BookSource.searchBooksByName("Psychology"));
  }, []);

  const [myData, myError] = usePromise(myPromise);
  const [myData2, myError2] = usePromise(myPromise2);

  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 3000,
    slideNum: 4,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  const handleBookChosen = (id) => {
    props.model.setCurrentBook(id);
    navigate(`/details/${id}`); // Navigera till detaljsidan med bokens ID
  };

  return (
    <div>
      {promiseNoData(myPromise, myData, myError) || (
        <HomeResultsView
          settings={settings}
          searchResults={myData}
          bookChosen={handleBookChosen}
        />
      )}
      {promiseNoData(myPromise2, myData2, myError2) || (
        <HomeResultsView
          settings={settings}
          searchResults={myData2}
          bookChosen={handleBookChosen}
        />
      )}
    </div>
  );
}
