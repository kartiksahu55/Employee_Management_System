import React, { useState } from "react";
import styleCss from "./Signup&Login.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { signup_api } from "../../config";

const Signup = () => {
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [goBackHome, setGoBackHome] = useState(false);

  const signupUser = async (signupDetail) => {
    try {
      // const signup_api =

      const { data, status } = await axios.post(signup_api, signupDetail, {
        withCredentials: true,
      });

      console.log(data.message, status);
      setIsSignupSuccessful(true);
      return Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      const { response } = error;
      console.log(response.data.message);
      return Swal.fire({
        title: "Error",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "Ok!",
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { fName, lName, email, pNumber, dob, gender, password } =
      event.target;
    const signupDetail = {
      firstname: fName.value,
      lastname: lName.value,
      email: email.value,
      phone: pNumber.value,
      dob: dob.value,
      gender: gender.value,
      password: password.value,
    };

    signupUser(signupDetail);
  };

  // ------------Navigate On Action------------
  if (isSignupSuccessful) {
    return <Navigate to="/user" />;
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
        <div className={styleCss.signup_Form__dob_gen}>
          <label htmlFor="dob">
            Date of Birth
            <input type="date" id="dob" name="dob" required />
          </label>
          {/*---- */}
          <label htmlFor="gender">
            Gender
            <select name="gender" id="gender" required placeholder="Select">
              <option value="">Please Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
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
