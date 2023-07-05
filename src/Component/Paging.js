import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../custCSS.css";

const Paging = ({ page, count, setPage}) => {

  return (
      <Pagination
          activePage={page}
          itemsCountPerPage={15}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={setPage}
      />
  );
};

export default Paging;