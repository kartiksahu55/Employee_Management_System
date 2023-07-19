import React, { useState } from "react";
import styleCss from "./Signup&Login.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [goBackHome, setGoBackHome] = useState(false);

  const loginUser = async (loginDetail) => {
    try {
      console.log(loginDetail);
      const { data, status } = await axios.post(
        "http://localhost:4000/api/user/login",
        loginDetail,
        { withCredentials: true }
      );
      console.log(data || "Oops! Something went wrong");
      setIsLoginSuccessful(true);
    } catch (err) {
      const error = err.response.data.message || err.message;
      console.log(error);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const { email, password } = event.target;
    const loginDetail = {
      email: email.value,
      password: password.value,
    };
    loginUser(loginDetail);
  };

  // ------------Navigate On Action------------
  if (isLoginSuccessful) {
    return <Navigate to="/" />;
  }
  if (goBackHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styleCss.login_or_signup__Page}>
      <form
        className={styleCss.login_or_signup__Form}
        style={{ height: "300px" }}
        onSubmit={formSubmitHandler}
      >
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Choose Password" />
        <button type="submit">Login</button>
        <div>
          Don't have an account:{" "}
          <Link className={styleCss.login_Redirect} to="/signup">
            Signup
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className={styleCss.login_or_signup__arrowLeft}
          onClick={() => setGoBackHome(true)}
        />
      </form>
    </div>
  );
};

export default Login;
