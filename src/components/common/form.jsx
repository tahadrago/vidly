import React, { useState, useEffect } from "react";

const Form = ({ schema, initialData, onSubmit, children, btnName, errors: externalErrors }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(externalErrors || {});

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setErrors(externalErrors); // Update errors when externalErrors change
  }, [externalErrors]);

  const validateProperty = (name, value) => {
    const propertySchema = schema.extract(name);
    const { error } = propertySchema.validate(value);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    onSubmit(data); // Pass the data to the submit handler
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    const errorMessage = validateProperty(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {React.Children.map(children, (child) => {
        if (child.props.name) {
          return React.cloneElement(child, {
            value: data[child.props.name] || "", // Ensure controlled input by passing value
            onChange: handleChange,
            error: errors[child.props.name],
          });
        }
        return child;
      })}
      <button
        disabled={validate()}
        className={`p-2 px-3 text-white rounded-md mt-4 focus:ring-4 ring-blue-200 duration-300 ${
          validate() ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
        } ${btnName === "Login" ? "self-center mx-auto" : "self-start"} `}
      >
        {btnName}
      </button>
    </form>
  );
};

export default Form;
