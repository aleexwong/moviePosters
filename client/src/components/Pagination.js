import React from "react";
import "./moviePosterCard.css";

function Pagination(props) {
  const { currentPageNumber, handlePrevPage, handleNextPage } = props;

  return (
    <div className="page-buttons">
      <button onClick={handlePrevPage}>Prev</button>
      <button>{currentPageNumber}</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}
export default Pagination;
