import React from "react";
import { useEffect } from "react";
const ListGroup = ({
  genres,
  onClick,
  currentGenre,
  textProperty = "name",
  valueProperty = "_id",
}) => {
  return (
    <div className="flex flex-col max-w-48">
      {genres.map((genre, index) => (
        <button
          key={genre[valueProperty]}
          onClick={() => onClick(genre)}
          className={`p-3 px-4 text-left border ${
            currentGenre === genre
              ? "bg-blue-600 text-white hover:bg-blue-500 "
              : "hover:bg-gray-300 "
          }${index === 0 ? "rounded-t-md " : ""} ${
            index === genres.length - 1 ? "rounded-b-md " : ""
          }
            `}
        >
          {genre[textProperty]}
        </button>
      ))}
    </div>
  );
};
export default React.memo(ListGroup);
