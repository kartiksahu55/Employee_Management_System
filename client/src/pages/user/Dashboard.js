import React, { useEffect, useState } from "react";
import styleCss from "./Dashboard.module.css";
import NavBar from "../../components/UI/header/NavBar";
import axios from "axios";
import { Navigate } from "react-router";
import Admin from "../../components/userRole/Admin";
import Employee from "../../components/userRole/Employee";
import { fetchUser_api } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ setuserLoggedIn }) => {
  const [sigUpNavigate, setSignUpNavigate] = useState(false);
  const [logInNavigate, setLogInNavigate] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const [userDataDB, setUserDataDB] = useState(null);
  const [employeeDataDB, setEmployeeDataDB] = useState(null);

  console.log(isAdmin);

  // -----Calling User-----
  const fetchUser = async () => {
    try {
      const response = await axios.get(fetchUser_api, {
        withCredentials: true,
      });
      const success = response.data.success;
      const message = response.data.message;
      const userData = response.data.user;

      setIsLoggedIn(success); //true
      setuserLoggedIn(success); //true
      setUserDataDB(userData);

      if (userData.role === "ADMIN") {
        setIsAdmin(success);
        setEmployeeDataDB(response.data.employeeData);
      } else {
        setIsEmployee(success);
      }
      // console.log(success, message);
    } catch (error) {
      const success = error.response?.data.success;
      const message = error.response?.data.message;
      const status = error.response?.status;

      setIsLoggedIn(success); //false
      setuserLoggedIn(success); //false

      console.log(success);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // -----Logout-----
  async function logoutUser() {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/logout",
        {
          withCredentials: true,
        }
      );

      console.log(data);
      setIsLoggedIn(!data.success);
      return <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  }

    // -----Navigate On Action-----
    if (sigUpNavigate) {
      return <Navigate to="/signup" />;
    }
    if (logInNavigate) {
      return <Navigate to="/login" />;
    }

  return (
    <div className={styleCss.dashboard_container}>
      {isLoggedIn && (
        <NavBar
          className="nav_bar"
          logoutUser={logoutUser}
          userDataDB={userDataDB}
        />
      )}
      {!isLoggedIn && (
        <div className={styleCss.dashboard_not_logedin}>
          <div className={styleCss.dashboard_Btn_Container}>
            <button
              className={styleCss.dashboard_button}
              onClick={() => setSignUpNavigate(true)}
            >
              SignUp
              <FontAwesomeIcon
                className={styleCss.dashboard_Font_Awesome}
                icon={faCircleRight}
              />
            </button>
            <button
              className={styleCss.dashboard_button}
              onClick={() => setLogInNavigate(true)}
            >
              LogIn
              <FontAwesomeIcon
                className={styleCss.dashboard_Font_Awesome}
                icon={faCircleRight}
              />
            </button>
          </div>
        </div>
      )}

      {isLoggedIn && <div className={isLoggedIn ? "route" : "remove_margin"}>
        {isAdmin ? (
          <Admin isAdmin={isAdmin} employeeDataDB={employeeDataDB} />
        ) : (
          <Employee isEmployee={isEmployee} userDataDB={userDataDB} />
        )}
      </div>}
    </div>
  );
};

export default Dashboard;
