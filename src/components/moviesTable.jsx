import React from "react";
import Table from "./common/table";
import Like from "./common/like";
const MoviesTable = ({
  moviesPag,
  user,
  onDelete,
  onLike,
  onSort,
  sortColumn,
}) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className={
            !user
              ? "hidden"
              : "bg-red-600 p-2 py-1 text-white rounded-md hover:bg-red-500 duration-300"
          }
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <Table
      user={user}
      columns={columns}
      data={moviesPag}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
