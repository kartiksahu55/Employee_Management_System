import React, { useState } from "react";
import "./Home.css";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";

const Home = ({ userLoggedIn }) => {
  const [dashboardNavigate, setDashboardNavigate] = useState(false);

  if (dashboardNavigate) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="home_page_login_non">
      <section className="home_page__left_Section">
        <p className="home_page__left_Section_text">Employee</p>
        <p className="home_page__left_Section_text">Management</p>
        <p className="home_page__left_Section_text">System App</p>

        <button
          className="home_page__left_Section_button goto_Dashbaord_button"
          onClick={() => setDashboardNavigate(true)}
        >
          Goto Dashboard
          <FontAwesomeIcon className="home_page_Font_Awesome" icon={faGauge} />
        </button>
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
