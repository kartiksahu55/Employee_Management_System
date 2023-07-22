import React, { useEffect, useState } from "react";
import "./Home.css";
import { faCircleRight, faGauge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";

const Home = ({ userLoggedIn }) => {
  const [sigUpNavigate, setSignUpNavigate] = useState(false);
  const [logInNavigate, setLogInNavigate] = useState(false);
  // const [dashboardNavigate, setDashboardNavigate] = useState(false);

  // -----Navigate On Action-----
  if (sigUpNavigate) {
    return <Navigate to="/signup" />;
  }
  if (logInNavigate) {
    return <Navigate to="/login" />;
  }
  // if (dashboardNavigate) {
  //   return <Navigate to="/user" />;
  // }

  return (
    <div className="home_page_login_non">
      <section className="home_page__left_Section">
        <p className="home_page__left_Section_text">Employee</p>
        <p className="home_page__left_Section_text">Management</p>
        <p className="home_page__left_Section_text">System App</p>
        {!userLoggedIn && (
          <div className="home_page__left_Section_Btn_Container">
            <button
              className="home_page__left_Section_button"
              onClick={() => setSignUpNavigate(true)}
            >
              SignUp
              <FontAwesomeIcon
                className="home_page_Font_Awesome"
                icon={faCircleRight}
              />
            </button>
            <button
              className="home_page__left_Section_button"
              onClick={() => setLogInNavigate(true)}
            >
              LogIn
              <FontAwesomeIcon
                className="home_page_Font_Awesome"
                icon={faCircleRight}
              />
            </button>
          </div>
        )}
        {/* {userLoggedIn && (
          <button
            className="home_page__left_Section_button goto_Dashbaord_button"
            onClick={() => setDashboardNavigate(true)}
          >
            Goto Dashboard
            <FontAwesomeIcon
              className="home_page_Font_Awesome"
              icon={faGauge}
            />
          </button>
        )} */}
      </section>
      <section className="home_page__right_Section">
        <img
          className="home_page__right_Section_Image"
          src="https://miro.medium.com/v2/resize:fit:1400/1*v0Af88G3Yboal5Ft0UmhFw.png"
          alt="ems"
        />
      </section>
    </div>
  );
};

export default Home;
