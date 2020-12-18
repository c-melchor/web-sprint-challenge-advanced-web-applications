import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  });

  const history = useHistory();

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const onLogin = e => {
    e.preventDefault();
    axiosWithAuth
      .post("/login", formValues)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <br />

      <form>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            onChange={onChange}
            placeholder="username"
            value={formValues.username}
            id="username"
            name="username"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            onChange={onChange}
            value={formValues.password}
            placeholder="password"
            id="password"
            name="password"
          />
        </label>
        <button type="submit" onSubmit={onLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
