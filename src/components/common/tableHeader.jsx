import React from "react";

const TableHeader = ({ sortColumn, onSort, columns }) => {
  const raiseSort = (path) => {
    const sortedColumn = {
      path,
      order:
        sortColumn.path === path && sortColumn.order === "asc" ? "desc" : "asc",
    };
    onSort(sortedColumn);
  };
  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if(!column.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-up"></i>;
    return <i className="fa fa-sort-down"></i>;
  };
  return (
    <thead className="border text-left border-b-2 border-x-0 ">
      <tr className="cursor-pointer">
        {columns.map((column, index) => (
          <th
            key={columns.path || columns.key || index}
            className="py-4"
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))} 
      </tr>
    </thead>
  );
};

export default TableHeader;
