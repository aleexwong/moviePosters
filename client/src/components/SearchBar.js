import React from "react";
import "./moviePosterCard.css";

function SearchBar(props) {
  const { searchQuery, setSearchQuery, handleSearch } = props;

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie or title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
