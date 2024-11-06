import React, { useEffect } from "react";
import Joi from "joi";
import Form from "./common/form";
import Input from "./common/input";
import { useState } from "react";
import auth from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [data] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const nav = useNavigate();
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });
  // useEffect(() => {
  //   if (auth.getCurrentUser()) return nav("/");
  // }, []);
  const doSubmit = async (data) => {
    try {
      await auth.login(data.username, data.password);
      const from = location.state?.from?.pathname || "/";
      window.location = from;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: error.response.data,
        }));
      }
    }
  };

  return (
    <div
      data-aos="zoom-in"
      className="mt-6 w-[450px] flex flex-col justify-center mx-auto"
    >
      <h1 className="mb-3 text-3xl font-semibold text-center mx-auto">Login</h1>
      <Form
        schema={schema}
        errors={errors}
        initialData={data}
        onSubmit={doSubmit}
        btnName="Login"
      >
        <Input name="username" label="Username" autoFocus />
        <Input name="password" label="Password" type="password" />
      </Form>
    </div>
  );
};

export default LoginForm;
