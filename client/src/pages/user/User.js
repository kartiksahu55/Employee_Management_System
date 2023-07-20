import React, { useEffect, useState } from "react";
import NavBar from "../../components/header/NavBar";
import axios from "axios";
import { Navigate } from "react-router";
import Admin from "../../components/userRole/Admin";
import Employee from "../../components/userRole/Employee";

const User = ({setuserLoggedIn}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [userDataDB, setUserDataDB] = useState(null);

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

        setIsLoggedIn(success); //true
        setuserLoggedIn(success); //true
        setUserDataDB(userData)

        if (userData.role === "ADMIN") {
          setIsAdmin(success);
        }
        console.log(success, message);
      } catch (error) {
        const success = error.response.data.success;
        const message = error.response.data.message;
        const status = error.response.status;

        setIsLoggedIn(success); //false
        setuserLoggedIn(success); //false

        console.log(success, message);
      }
    };
    fetchUser();
  }, []);

  // -----Logout-----
  const logoutUser = async () => {
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
  };

  return (
    <div>
      {isLoggedIn && <NavBar className="nav_bar" logoutUser={logoutUser} userDataDB={userDataDB} />}
      <div className={isLoggedIn?"route":"remove_margin"}>
        {isAdmin ? <Admin/> : <Employee />}
      </div>
    </div>
  );
};

export default User;
