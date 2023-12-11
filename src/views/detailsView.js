import React from "react";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Stars from "react-stars-display";
import { Link } from "react-router-dom";

export function DetailsView(props) {
  const navigate = useNavigate();
  const info = props.book ? props.book.volumeInfo : null;

  return (
    <section className="book-section">
       <Link to="/" className="home-button">Home</Link>
      {info ? (
        <div className="details-book">
          <div>
            {info.imageLinks && (
              <img src={info.imageLinks.thumbnail} alt={info.title} />
            )}

            <div>
              {props.isBookInList === undefined ? (
                <button
                  className="btn"
                  onClick={() => {
                    props.login ? props.bookAdded(props.book) : navigate("/login");
                  }}
                >
                  Add to Collection
                </button>
              ) : null}
            </div>
          </div>

          <div className="book-info">
            <div>
              <span>title: </span>
              {info.title}
              {info.subtitle && <span>: {info.subtitle}</span>}
            </div>

            {info.language && (
              <div>
                <span>language: </span>
                {info.language === "en" ? "English" : info.language}
              </div>
            )}

            {info.authors && (
              <div>
                <span>author(s): </span>
                <ul>
                  {info.authors.map((author, index) => (
                    <li key={index}>{author}</li>
                  ))}
                </ul>
              </div>
            )}

            {info.industryIdentifiers && (
              <div>
                <span>ISBN: </span>
                {info.industryIdentifiers.map((identifier, index) => (
                  <span key={index}>{identifier.identifier}{index < info.industryIdentifiers.length - 1 ? ', ' : ''}</span>
                ))}
              </div>
            )}

            {info.categories && (
              <div>
                <span>genre(s): </span>
                <ul>
                  {info.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              </div>
            )}

            {info.description && (
              <div>
                <span>description: </span>
                <LinesEllipsis
                  text={info.description.replace(/<(.|\n)*?>/g, "")}
                  maxLine={props.readMore ? "100" : "3"}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
                <button
                  className="btn read-more"
                  type="button"
                  onClick={() => props.setReadMore()}
                >
                  {props.readMore ? "List less" : "List more"}
                </button>
              </div>
            )}

            {info.publisher && (
              <div>
                <span>publisher: </span>
                {info.publisher}
              </div>
            )}

            {info.averageRating !== undefined && (
              <div>
                <span>Customer Reviews: </span>
                <Stars stars={info.averageRating} size={20} />
              </div>
            )}

            {info.pageCount && (
              <div>
                <span>page count: </span>
                {info.pageCount} pages
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </section>
  );
}
