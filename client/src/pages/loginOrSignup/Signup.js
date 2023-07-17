import React from "react";
import styleCss from "./Signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className={styleCss.login_or_signup__Page}>
      <form className={styleCss.login_or_signup__Form}>
        <h2>Signup</h2>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Choose Password" />
        <button type="submit">Signup</button>
        <div>
          Already Logged In:{" "}
          <Link className={styleCss.login_Redirect} to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
