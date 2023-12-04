import React, { useState, useEffect } from "react";
import { usePromise } from "../js/usePromise.js";
import { promiseNoData } from "../js/promiseNoData.js";
import { HomeResultsView } from "../views/homeView";
import { getBookDetails, searchBooksByName } from "../js/bookSource";
import { Model } from "../js/Model.js"; // Importera Model

export function HomePresenter(props) {
  const [myPromise, setPromise] = useState(null);
  const [myPromise2, setPromise2] = useState(null);
  useEffect(function () {
    setPromise(searchBooksByName("Fiction"));
    setPromise2(searchBooksByName("Psychology"));
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

  return (
    <div>
      {promiseNoData(myPromise, myData, myError) || (
        <HomeResultsView
          settings={settings}
          searchResults={myData}
          bookChosen={(id) => props.model.setCurrentBook(id)} // Anropa setCurrentBook från Model
        />
      )}
      {promiseNoData(myPromise2, myData2, myError2) || (
        <HomeResultsView
          settings={settings}
          searchResults={myData2}
          bookChosen={(id) => props.model.setCurrentBook(id)} // Anropa setCurrentBook från Model
        />
      )}
    </div>
  );
}
