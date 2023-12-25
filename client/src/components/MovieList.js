import React from "react";
import "./MovieList.css";
import defaultPicture from "../constants/images/default-movie-poster.png";

function MovieList(props) {
  const { searchResults } = props;

  return (
    <ul className="movie-results">
      {!searchResults && (
        <div className="no-results">
          <div className="movie-list">
            There are no results.
            <p>Try another search such as "Batman" or "Star Wars".</p>
            <a href="/">Reset the search</a>
          </div>
        </div>
      )}
      {searchResults &&
        searchResults.map((movie) => (
          <div className="movie-list" key={movie.imdbID}>
            <img
              className="default-movie-poster"
              src={movie.Poster === "N/A" ? defaultPicture : movie.Poster}
              alt={movie.Title}
            />
            <div className="movie-list-info">
              <div className="movie-list-title">{movie.Title}</div>
              <div className="movie-list-year">{movie.Year}</div>
              <button>View</button>
            </div>
          </div>
        ))}
    </ul>
  );
}

export default MovieList;
