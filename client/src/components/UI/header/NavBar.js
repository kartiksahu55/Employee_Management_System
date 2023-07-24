import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faHouseChimney,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar = ({ logoutUser, userDataDB }) => {
  const [activeItem, setActiveItem] = useState(null);

  // First and Last Name = Full Name

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="navbar_main_cointainer">
      <div className="user_panel">
        <img
          src={
            userDataDB.avatar.secure_url ||
            "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
          }
          alt=""
        />
        <p>{userDataDB.role}</p>
        <p className="user_panel_fullname">
          {userDataDB.firstname + " " + userDataDB.lastname}
        </p>
      </div>
      <div className="dashBord">
        <FontAwesomeIcon icon={faGaugeHigh} />
        <p>Dashbord</p>
      </div>

      <div className="admin_Section">
        {/* ------------Profile Page------------ */}
        <ul>
          <li
            className={activeItem === "home" ? "active" : "inactive"}
            onClick={() => handleItemClick("home")}
          >
            <FontAwesomeIcon icon={faHouseChimney} />
            <Link to="/">Home</Link>
          </li>
          <li className="inactive" onClick={() => logoutUser()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
