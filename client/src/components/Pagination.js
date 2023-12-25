import React from "react";
import "./Pagination.css";

function Pagination(props) {
  const {
    numberOfReturnSearchs,
    currentPageNumber,
    handlePrevPage,
    handleNextPage,
  } = props;

  return (
    <div className="page-buttons">
      {currentPageNumber > 1 && <button onClick={handlePrevPage}>Prev</button>}
      <button> {currentPageNumber}</button>
      {numberOfReturnSearchs >= 10 && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
}
export default Pagination;
