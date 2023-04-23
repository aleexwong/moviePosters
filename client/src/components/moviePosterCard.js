import React, { useState, useRef } from "react";
import "./moviePosterCard.css";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

function MoviePosterCard() {
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
    currentPageNumber.current++;
    handleSearch();
  };

  return (
    <div className="whole-page">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <MovieList searchResults={searchResults} />
      <div className="render-buttons">
        {searchResults != "" && (
          <Pagination
            currentPageNumber={currentPageNumber.current}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </div>
  );
}

export default MoviePosterCard;
