import React, { useState, useEffect } from "react";

function MoviePosterCard(props) {
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const result = [];

  const handleSearch = () => {
    fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=a35d47f2`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.Search);
        console.log(data.Search);
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
              <li>{result.Title}</li>
              <img src={result.Poster} alt={result.title} />
            </div>
          ))}
      </ul>
    </div>
  );
}
export default MoviePosterCard;
