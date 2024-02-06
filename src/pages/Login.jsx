import React, { useState } from "react";
import "../styles/style.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      alert("Email and Password is required.");
      return false;
    } else if (password === "") {
      alert("Email and Password is required.");
      return false;
    }
    return true;
  };

  const authenticateUser = (user) => {
    const { username, password } = user;
    if (username === "kashish" && password === "12345678") {
      // Dummy authentication
      const response = {
        status: true,
        msg: "Login Successful",
      };
      return response;
    } else {
      const response = {
        status: false,
        msg: "Login Unsuccessful",
      };
      return response;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const data = authenticateUser(values);
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        console.log(data.msg);
        alert("Login Successful!");
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="formContainer">
        <form className="form" action="" onSubmit={handleSubmit}>
          <input
          className="inputField"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            min="3"
          />
          <input
          className="inputField"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button className="btn" type="submit">Log In</button>
          <span className="link">
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div>
    </>
  );
}
