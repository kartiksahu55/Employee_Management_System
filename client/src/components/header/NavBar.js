import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLarge,
  faGaugeHigh,
  faHouseChimney,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="navbar_main_cointainer">
      <FontAwesomeIcon icon={faUserLarge} className="fa_User" />
      <div className="dashBord">
        <FontAwesomeIcon icon={faGaugeHigh} />
        <p>Dashbord</p>
      </div>
      <div className="admin_Section">
        <ul>
          <li
            className={activeItem === "home" ? "active" : "inactive"}
            onClick={() => handleItemClick("home")}
          >
            <FontAwesomeIcon icon={faHouseChimney} />
            <Link to="/">Home</Link>
          </li>
          <li
            className={activeItem === "Signup" ? "active" : "inactive"}
            onClick={() => handleItemClick("Signup")}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <Link to="/signup">Signup</Link>
          </li>
          <li
            className={activeItem === "Login" ? "active" : "inactive"}
            onClick={() => handleItemClick("Login")}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <Link to="/login">Login</Link>
          </li>
          <li
            className={activeItem === "Logout" ? "active" : "inactive"}
            onClick={() => handleItemClick("Logout")}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
