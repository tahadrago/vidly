import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
const TableBody = ({ data, columns, user }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.path === "title")
      return (
        <Link
          to={`/movies/${item._id}`}
          className="text-blue-600 hover:underline"
        >
          {_.get(item, column.path)}
        </Link>
      );
    return _.get(item, column.path);
  };
  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr className="border-b" key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)} className="py-4">
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
