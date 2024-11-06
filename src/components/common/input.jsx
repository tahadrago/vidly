import React, { useRef, useEffect } from "react";

const Input = ({ name, label, options, autoFocus, error, value, onChange, ...rest }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current.focus();
  }, [autoFocus]);

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <label htmlFor={name}>{label}</label>
        {options ? (
          <select
            {...rest}
            id={name}
            ref={inputRef}
            value={value} // Ensure the value is controlled
            onChange={onChange} // Ensure onChange is passed
            className="border border-gray-400 rounded-md p-1.5 px-2 outline-0 focus:ring-4 ring-blue-200 focus:border-blue-400 duration-300"
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...rest}
            ref={inputRef}
            id={name}
            value={value} // Ensure the value is controlled
            onChange={onChange} // Ensure onChange is passed
            className="border border-gray-400 rounded-md p-1.5 px-2 outline-0 focus:ring-4 ring-blue-200 focus:border-blue-400 duration-300"
          />
        )}
      </div>
      {error && (
        <div className="bg-red-200 rounded-md text-red-900 p-2 px-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
