import React from "react";
import defaultPicture from "../constants/images/default-movie-poster.png";

function MovieList(props) {
  const { searchResults } = props;

  return (
    <ul className="movie-results">
      {!searchResults && (
        <div className="no-results">
          There are no results. Try another search
        </div>
      )}
      {searchResults &&
        searchResults.map((movie) => (
          <div className="movie-list" key={movie.imdbID}>
            <img
              src={movie.Poster === "N/A" ? defaultPicture : movie.Poster}
              alt={movie.Title}
            />
            <div className="movie-list-info">
              <div className="movie-list-title">{movie.Title}</div>
              <div className="movie-list-year">{movie.Year}</div>
              <div className="movie-list-button">
                <button>View</button>
              </div>
            </div>
          </div>
        ))}
    </ul>
  );
}

export default MovieList;
