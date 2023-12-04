import { useNavigate } from "react-router-dom";

function SearchFormView(props) {
  return (
    <div>
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => props.onText(e.target.value)}
      ></input>
      <select onChange={(e) => props.onCategor(e.target.value)}>
        <option>Category:</option>
        {props.options.map(function (opt) {
          return <option key={opt}> {opt} </option>;
        })}
      </select>
      <button className="btn" onClick={(e) => props.onSearch()}>
        Search
      </button>
    </div>
  );
}

function SearchResultsView(props) {
  const navigate = useNavigate();

  return (
    <div className="search-container">
      {props.searchResults !== null
        ? props.searchResults.map(function (book) {
            return (
              <div
                className="book-card"
                key={book.id}
                onClick={(e) => {
                  props.bookChosen(book.id);
                  navigate("/details");
                }}
              >
               <img
  src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'defaultThumbnailUrl'}
  alt={book.volumeInfo.title}
  onClick={(e) => {
    navigate("/details");
    props.bookChosen(book.id);
  }}
/>

                <div className="book-card-info">
                  <p>{book.volumeInfo.categories}</p>
                  <p>{book.volumeInfo.title}</p>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export { SearchFormView, SearchResultsView };
