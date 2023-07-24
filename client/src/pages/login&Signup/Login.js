import React, { useState } from "react";
import styleCss from "./Signup&Login.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { login_api } from "../../config";
import PageLoader from "../../components/UI/PageLoader";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [goBackHome, setGoBackHome] = useState(false);

  // console.log(login_api);

  const loginUser = async (loginDetail) => {
    try {
      // console.log(loginDetail);
      setLoader(true);
      const { data } = await axios.post(login_api, loginDetail, {
        withCredentials: true,
      });
      // console.log(data || "Oops! Something went wrong");
      setIsLoginSuccessful(true);
      return Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      // console.log(error);
      setLoader(false);
      if (!error.response) {
        return Swal.fire({
          title: error.message,
          icon: "error",
          confirmButtonText: "Ok!",
        });
      } else {
        return Swal.fire({
          title: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok!",
        });
      }
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
    return <Navigate to="/dashboard" />;
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
        <input type="email" name="email" required placeholder="Email" />
        <input
          type="password"
          name="password"
          required
          minLength="8"
          placeholder="Choose Password"
        />
        {!loader && <button type="submit">Login</button>}
        {loader && <PageLoader />}
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
