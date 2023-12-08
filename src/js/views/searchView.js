import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const { bookChosen, searchResults } = props;

  const handleBookClick = (id) => {
    if (bookChosen) {
      bookChosen(id);
      navigate("/details");
    }
  };

  return (
    <div className="search-container">
      <Link to="/" className="home-button">Home</Link>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((book) => (
          <div className="book-card" key={book.id} onClick={() => handleBookClick(book.id)}>
            <img
              src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'defaultThumbnailUrl'}
              alt={book.volumeInfo.title}
            />
            <div className="book-card-info">
              <p>{book.volumeInfo.categories}</p>
              <p>{book.volumeInfo.title}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Inga resultat hittades</p>
      )}
    </div>
  );
}




export { SearchFormView, SearchResultsView };
