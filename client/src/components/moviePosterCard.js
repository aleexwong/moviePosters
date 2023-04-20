import React, { useState, useRef } from "react";
import "./moviePosterCard.css";
import defaultPicture from "../constants/images/default-movie-poster.png";

function MoviePosterCard(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const pageCount = useRef(1);

  const handleSearch = async () => {
    if (searchQuery === "") {
      pageCount.current = 1;
      return;
    }
    try {
      const response = await fetch(
        `https://omdbapi.com/?s=${searchQuery}&page=${pageCount.current}&apikey=4a3b711b`
      );
      const data = await response.json();
      setSearchResults(data.Search);
      console.log(pageCount);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="whole-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul className="movie-results">
          {searchResults === undefined && (
            <div className="no-results">
              There are no results for "{searchQuery}". Try another search
            </div>
          )}
          {searchResults &&
            searchResults.map((result) => (
              <div className="movie-list" key={result.imdbID}>
                <div className="movie-list-image">
                  <img
                    src={
                      result.Poster && result.Poster !== "N/A"
                        ? result.Poster
                        : defaultPicture
                    }
                    alt={result.title}
                  />
                </div>
                <div className="movie-list-info">
                  <div className="movie-list-title">{result.Title}</div>
                  <div className="movie-list-year">{result.Year}</div>
                  <div className="movie-list-button">
                    <button>View</button>
                  </div>
                </div>
              </div>
            ))}
        </ul>
        <div className="page-buttons">
          <button
            onClick={() => {
              if (pageCount.current <= 1) {
                pageCount.current = 1;
              } else {
                pageCount.current--;
                handleSearch();
              }
            }}
          >
            Prev
          </button>
          <button>{pageCount.current}</button>
          <button
            onClick={() => {
              if (searchResults === undefined) {
                pageCount.current = pageCount.current;
              } else {
                pageCount.current++;
                handleSearch();
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviePosterCard;
