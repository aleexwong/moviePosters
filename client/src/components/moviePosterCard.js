import React, { useState, useRef } from "react";
import "./moviePosterCard.css";
import defaultPicture from "../constants/images/default-movie-poster.png";

function MoviePosterCard(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const pageCount = useRef(1);

  // Set default picture URL if pictureUrl is empty or null

  const handleSearch = () => {
    if (searchQuery === "") {
      pageCount.current = 1;
      return;
    }
    fetch(
      // `http://localhost:5001/api/search?searchQuery=${searchQuery}&page=${pageCount.current}`
      `https://omdbapi.com/?s=${searchQuery}&page=${pageCount.current}&apikey=4a3b711b`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.Search);
        console.log(pageCount);
        // additionally when added page we are limited to 10 results per page,
        // new updates will require a new request again, everytime.
      });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul className="movie-results">
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
              <div className="movie-list-title">{result.Title}</div>
              <div className="movie-list-year">{result.Year}</div>
              <div className="movie-list-button">
                <button>View</button>
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
            pageCount.current++;
            handleSearch();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MoviePosterCard;
