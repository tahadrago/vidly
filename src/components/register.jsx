import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
const Register = () => {
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  });

  const doSubmit = async (data) => {
    try {
      const response = await userService.register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
      // Optionally redirect or show a success message here
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Assign the error message to `errors.username`
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: error.response.data, // assuming the error message is here
        }));
      }
    }
  };

  return (
    <div data-aos="zoom-out" className="mt-6 max-w-[676px] flex flex-col justify-center mx-6 md:mx-auto">
      <h1 className="mb-3 text-3xl font-semibold">Register</h1>
      <Form
        errors={errors} // Pass errors as a prop
        schema={schema}
        initialData={data}
        onSubmit={doSubmit}
        btnName="Register"
      >
        <Input name="username" label="Username" autoFocus />
        <Input name="password" label="Password" type="password" />
        <Input name="name" label="Name" type="name" />
      </Form>
    </div>
  );
};

export default Register;
