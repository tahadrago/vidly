import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <div className="flex justify-center">
      {pages.map((page, index) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`p-2 px-4 border
            ${
              page === currentPage
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "hover:bg-gray-300"
            }
            ${index === 0 ? "rounded-l-md" : ""} ${
            index === pages.length - 1 ? "rounded-r-md" : ""
          }
          `}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

{
  /* <button
  onClick={props.handle1}
  className="bg-blue-600 text-white p-2 px-4 rounded-l-md hover:bg-blue-500"
>
  1
</button>
<button
  onClick={props.handle2}
  className="p-2 px-4 border hover:bg-gray-300 "
>
  2
</button>
<button
  onClick={props.handle3}
  className="p-2 px-4 border rounded-r-md hover:bg-gray-300"
>
  3
</button> */
}
