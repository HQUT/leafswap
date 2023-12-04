import React, { useState } from "react";
import { usePromise } from "../js/usePromise.js";
import { promiseNoData } from "../js/promiseNoData.js";
import { SearchFormView, SearchResultsView } from "../views/searchView.js";
import { searchBooksByName } from "../js/bookSource"; // Använd rätt import
import { categories } from "../data";

export function SearchPresenter(props) {
  const [myPromise, setPromise] = useState(null);
  const [query, setQuery] = useState("");
  const [categor, setCategor] = useState("");

  const [myData, myError] = usePromise(myPromise);

  const searchBook = () => {
    if (query && categor)
      setPromise(searchBooksByName(query)); // Använd den rätta funktionen
    else return;
  };

  return (
    <div>
      <SearchFormView
        options={categories}
        onText={(text) => setQuery(text)}
        onCategor={(categor) => setCategor(categor)}
        onSearch={searchBook}
      />
      {promiseNoData(myPromise, myData, myError) || (
        <SearchResultsView
          searchResults={myData}
          bookChosen={(id) => props.model.setCurrentBook(id)}
        />
      )}
    </div>
  );
}

