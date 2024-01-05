import React, { useState, useEffect } from "react";
import { usePromise, promiseNoData } from "../js/Promise.js";
import { SearchFormView, SearchResultsView } from "../views/searchView.js";
import { BookSource } from "../js/bookSource.js";

export function SearchPresenter(props) {
  const [myPromise, setPromise] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const [myData, myError] = usePromise(myPromise);

  const categories = ["Fiction", "Fantasy", "Roman","Family & Relationships", 
 "Cooking", "Political", "Sci-fi","Philosophy"];

 useEffect(() => {
  doSearch();
}, []);

const doSearch = () => {
  const searchQuery = "Popular";
  const popularCategory = "New"; 
  setPromise(BookSource.searchBookByCategory(searchQuery, popularCategory));
};


const searchBook = () => {
  if (query) {
    if (category) {
      setPromise(BookSource.searchBookByCategory(query, category));
    } else {
      setPromise(BookSource.searchBookByName(query));
    }
  } else {
    return;
  }
};

return (
  <div>
    <SearchFormView
      options={categories}
      onText={(text) => setQuery(text)}
      onCategor={(categories) => setCategory(categories)}
      onSearch={searchBook}
    />

    {promiseNoData(myPromise, myData, myError) || (
      <SearchResultsView
        searchResults={myData}
        bookChosen={(id) => props.model?.setCurrentBook(id)}
      />
    )}
  </div>
);
    }
