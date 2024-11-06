import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      onChange={(e) => onChange(e.currentTarget.value)}
      type="text"
      value={value}
      placeholder="Search..."
      className="border mb-4 w-full p-2 px-3 rounded-md outline-0 focus:ring-4 ring-blue-200 focus:border-blue-400 duration-300"
    />
  );
};

export default SearchBox;
