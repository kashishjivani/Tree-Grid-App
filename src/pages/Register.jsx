import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      alert("Password and confirm password should be same.");
      return false;
    } else if (password.length < 8) {
      alert("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      alert("Email is required.");
      return false;
    }
    return true;
  };

  const authenticateUser = (user) => {
    if (user) {
      const dummyData = {
        status: true,
        msg: "Registered Successfully",
      };
      return dummyData;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const data = authenticateUser({
        username,
        email,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        alert(data.msg);
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
          />
          <input
          className="inputField"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
          className="inputField"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
          className="inputField"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button className="btn" type="submit">Register</button>
          <span className="link">
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>
    </>
  );
}
