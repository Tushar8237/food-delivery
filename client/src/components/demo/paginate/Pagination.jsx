import React from "react";

export default function Pagination({
  productPerPage,
  totalProducts,
  paginate,
  currentPage,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumber.push(i);
  }
  console.log(pageNumber)
  console.log(currentPage)
  return (
    <div>
      {pageNumber.map((n, index) => (
        <button key={index} onClick={() => paginate(n)}>
          {n} numbers
        </button>
      ))}

      <h1> number</h1>
    </div>
  );
}
