import React, { useState, useEffect, useRef } from "react";

function MoviePosterCard(props) {
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const pageCount = useRef(1);

  const handleSearch = () => {
    fetch(
      `https://www.omdbapi.com/?s=${searchQuery}&page=${pageCount.current}&apikey=a35d47f2`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.Search);
        console.log(pageCount);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults &&
          searchResults.map((result) => (
            <div key={result.imdbID}>
              <div>{result.Title}</div>
              <img src={result.Poster} alt={result.title} />
            </div>
          ))}
      </ul>
      <div className="page-buttons">
        <button
          onClick={() => {
            if (pageCount <= 1) {
              pageCount = 1;
              handleSearch();
            } else {
              pageCount.current--;
              handleSearch();
            }
          }}
        >
          Previous
        </button>
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
