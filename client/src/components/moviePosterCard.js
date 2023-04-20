import React, { useState, useRef } from "react";
import "./moviePosterCard.css";
import defaultPicture from "../constants/images/default-movie-poster.png";

function MoviePosterCard(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const currentPageNumber = useRef(1);
  const prevSearchQuery = useRef("");

  const resetPageNumber = () => {
    currentPageNumber.current = 1;
  };

  const handleSearch = async () => {
    if (searchQuery === "") {
      currentPageNumber.current = 1;
      return;
    }
    // If search query is different from the previous search query, reset the page number back to 1
    if (searchQuery !== prevSearchQuery.current) {
      resetPageNumber();
    }
    try {
      const response = await fetch(
        `https://omdbapi.com/?s=${searchQuery}&page=${currentPageNumber.current}&apikey=4a3b711b`
      );
      const data = await response.json();
      setSearchResults(data.Search);
      // Update the previous search query
      prevSearchQuery.current = searchQuery;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevPage = () => {
    if (currentPageNumber.current <= 1) {
      resetPageNumber();
    } else {
      currentPageNumber.current--;
      handleSearch();
    }
  };

  const handleNextPage = () => {
    if (searchResults === undefined) {
      currentPageNumber.current = currentPageNumber.current;
    } else {
      currentPageNumber.current++;
      handleSearch();
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
          {!searchResults && (
            <div className="no-results">
              There are no results. Try another search
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
              handlePrevPage();
            }}
          >
            Prev
          </button>
          <button>{currentPageNumber.current}</button>
          <button
            onClick={() => {
              handleNextPage();
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
