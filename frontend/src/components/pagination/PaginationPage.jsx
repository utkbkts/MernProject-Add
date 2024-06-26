import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
const PaginationPage = ({ resPerPage, filteredProductsCount }) => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState();

  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="pagination">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={filteredProductsCount}
        pageRangeDisplayed={5}
        onChange={setCurrentPageNo}
      />
    </div>
  );
};

export default PaginationPage;
