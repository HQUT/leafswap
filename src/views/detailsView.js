import React from "react";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Stars from "react-stars-display";

export function DetailsView(props) {
  const navigate = useNavigate();
  const info = props.book.volumeInfo;

  return (
    <section className="book-section">
      <div className="details-book">
        <div>
          {/* Visa bilden om den finns, annars ingenting */}
          {info.imageLinks && (
            <img src={info.imageLinks.thumbnail} alt={info.title} />
          )}

          <div>
            {props.isBookInList === undefined ? (
              <button
                className="btn"
                onClick={() => {
                  props.login && props.bookAdded(props.book);
                  !props.login && navigate("/login");
                }}
              >
                Add to list!
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
              <span>
                author<span style={{ textTransform: "lowercase" }}>(s)</span>:{" "}
              </span>
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
              <span>
                genre<span style={{ textTransform: "none" }}>(s)</span>:{" "}
              </span>
              <ul>
                {info.categories.map((cat, index) => (
                  <li key={index}>{cat}</li>
                ))}
              </ul>
            </div>
          )}

          {info.description && (
            <div>
              <span>description: </span>
              <div style={{ textTransform: "none", display: "inline" }}>
                <LinesEllipsis
                  text={info.description.replace(/<(.|\n)*?>/g, "")}
                  maxLine={`${props.readMore ? "100" : "3"}`}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </div>
              <button
                className="btn read-more"
                type="button"
                onClick={() => props.setReadMore()}
              >
                {props.readMore ? "read less" : "read more"}
              </button>
            </div>
          )}

          {info.publisher && (
            <div>
              <span>publisher: </span>
              {info.publisher}
            </div>
          )}

          {info.publishedDate && (
            <div>
              <span>publication date: </span>
              {info.publishedDate}
            </div>
          )}

          {info.averageRating !== undefined && (
            <div>
              <span>Customer Reviews: </span>
              <Stars stars={info.ratingsCount} size={20} />
            </div>
          )}

          {info.pageCount && (
            <div>
              <span>no page: </span>
              {info.pageCount} pages
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
