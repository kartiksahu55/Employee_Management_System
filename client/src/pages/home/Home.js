import React, { useEffect, useState } from "react";
import Admin from "../../components/admin/Admin";
import "./Home.css";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";
import axios from "axios";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [homePage, setHomePage] = useState(null);
  const [adminData, setAdminData] = useState(null)
  const [sigUpNavigate, setSignUpNavigate] = useState(false);
  const [logInNavigate, setLogInNavigate] = useState(false);

  setIsLoggedIn(!homePage);
  console.log(homePage);

  // -----Calling User-----
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/fetch",
          { withCredentials: true }
        );
        const success = response.data.success;
        const message = response.data.message;
        const userData = response.data.user;

        setHomePage(!success);

        console.log(success, message, userData);
      } catch (error) {
        const success = error.response.data.success;
        const message = error.response.data.message;
        const status = error.response.status;

        setHomePage(!success);

        console.log(success, message, status);
      }
    };
    fetchUser();
  }, [isLoggedIn]);

  // -----Navigate On Action-----
  if (sigUpNavigate) {
    return <Navigate to="/signup" />;
  }
  if (logInNavigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* -----Admin Dashbord----- */}
      {!homePage && <Admin />}

      {/* -----Home Page without login----- */}
      {homePage && (
        <div className="home_page_login_non">
          <section className="home_page__left_Section">
            <p className="home_page__left_Section_text">Employee</p>
            <p className="home_page__left_Section_text">Management</p>
            <p className="home_page__left_Section_text">System App</p>
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
          </section>
          <section className="home_page__right_Section">
            <img
              className="home_page__right_Section_Image"
              src="https://miro.medium.com/v2/resize:fit:1400/1*v0Af88G3Yboal5Ft0UmhFw.png"
              alt="ems"
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
