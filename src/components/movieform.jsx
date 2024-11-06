import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const Movieform = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/movies", { replace: true });
  };
  return (
    <div className="flex m-10 flex-col items-start space-y-4">
      <h1 className="text-2xl">Movie From {id}</h1>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white p-1 px-2.5 rounded-md hover:bg-blue-500"
      >
        Save
      </button>
    </div>
  );
};

export default Movieform;
