import React from "react";
import "./moviePosterCard.css";

function Pagination(props) {
  const {
    numberOfReturnSearchs,
    currentPageNumber,
    handlePrevPage,
    handleNextPage,
  } = props;

  return (
    <div className="page-buttons">
      {/* <button onClick={handlePrevPage}>Prev</button> */}
      {numberOfReturnSearchs >= 10 && currentPageNumber > 1 && (
        <button onClick={handlePrevPage}>Prev</button>
      )}
      {numberOfReturnSearchs < 10 && currentPageNumber > 1 && (
        <button onClick={handlePrevPage}>Prev</button>
        /* Handling the case of the very end of the search results*/
      )}
      {/* {currentPageNumber > 1 && <button onClick={handlePrevPage}>Prev</button>} */}
      <button>{currentPageNumber}</button>
      {/* <button onClick={handleNextPage}>Next</button> */}
      {numberOfReturnSearchs >= 10 && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
}
export default Pagination;
