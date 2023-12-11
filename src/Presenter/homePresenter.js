import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePromise, promiseNoData} from "../js/Promise.js";
import { HomeResultsView } from "../views/homeView";
import { BookSource } from "../js/bookSource.js";

export function HomePresenter(props) {
  const [Promise, setPromise] = useState(null);
  const [Promise2, setPromise2] = useState(null);
  const [Promise3, setPromise3] = useState(null);
  useEffect(function () {
    setPromise(BookSource.searchBookByCategory("  ", "Cooking"));
    setPromise2(BookSource.searchBookByCategory("   ", "Roman"));
    setPromise3(BookSource.searchBookByCategory("    ", "Fantasy"));
  }, []);

  const [Data, Error] = usePromise(Promise);
  const [Data2, Error2] = usePromise(Promise2);
  const [Data3, Error3] = usePromise(Promise3);

  var settings = { dots: true, autoplay: true, infinite: true,speed: 3000, slideNum: 4, autoplaySpeed: 5000,
  slidesToShow: 5,slidesToScroll: 3, };
  
  const navigate = useNavigate();
  
  const handleBookClick = (id) => {
    props.model?.setCurrentBook(id); 
    navigate(`/details`); 
  };
  
  
  return (
    <div>
      {promiseNoData(Promise, Data, Error) || (
        <HomeResultsView
          settings={settings}
          searchResults={Data}
          bookChosen={handleBookClick} 
        />
      )}
      {promiseNoData(Promise2, Data2, Error2) || (
        <HomeResultsView
          settings={settings}
          searchResults={Data2}
          bookChosen={handleBookClick} 
        />
      )}
      {promiseNoData(Promise3, Data3, Error3) || (
        <HomeResultsView
          settings={settings}
          searchResults={Data3}
          bookChosen={handleBookClick} 
        />
      )}
    </div>
  );
}
