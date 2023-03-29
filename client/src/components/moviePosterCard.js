import React, { useState, useEffect } from "react";

function MoviePosterCard(props) {
  const [movie, setMovie] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=a35d47f2`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        console.log(data);
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
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default MoviePosterCard;
