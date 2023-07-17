import React from "react";
import styleCss from "./Signup.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styleCss.login_or_signup__Page}>
      <form className={styleCss.login_or_signup__Form}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Choose Password" />
        <button type="submit">Login</button>
        <div>
         Don't have an account:{" "}
          <Link className={styleCss.login_Redirect} to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;