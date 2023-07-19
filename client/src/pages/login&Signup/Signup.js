import React, { useState } from "react";
import styleCss from "./Signup&Login.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [goBackHome, setGoBackHome] = useState(false);

  const signupUser = async (signupDetail) => {
    try {
      const { data, status } = await axios.post(
        "http://localhost:4000/api/user/signup",
        signupDetail,
        { withCredentials: true }
      );

      console.log(data.message, status);
      setIsSignupSuccessful(true);
    } catch (error) {
      const { response } = error;
      console.log(response.data.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { fName, lName, email, pNumber, password } = event.target;
    const signupDetail = {
      firstname: fName.value,
      lastname: lName.value,
      email: email.value,
      phone: pNumber.value,
      password: password.value,
    };

    signupUser(signupDetail);
  };

  // ------------Navigate On Action------------
  if (isSignupSuccessful) {
    return <Navigate to="/" />;
  }
  if (goBackHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styleCss.login_or_signup__Page}>
      <form className={styleCss.login_or_signup__Form} onSubmit={submitHandler}>
        <h2>Signup</h2>
        <input type="text" name="fName" placeholder="First Name" />
        <input type="text" name="lName" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="number" name="pNumber" placeholder="Phone Number" />
        <input type="password" name="password" placeholder="Choose Password" />
        <button type="submit">Signup</button>
        <div>
          Already Logged In:{" "}
          <Link className={styleCss.login_Redirect} to="/login">
            Login
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

export default Signup;
