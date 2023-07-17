import React from "react";
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
  return (
    <div className="navbar_main_cointainer">
      <FontAwesomeIcon icon={faUserLarge} className="fa_User" />
      <div className="dashBord">
        <FontAwesomeIcon icon={faGaugeHigh} />
        <p>Dashbord</p>
      </div>
      <div className="admin_Section">
        <ul>
          <li>
            <FontAwesomeIcon icon={faHouseChimney} />
            <Link to="/">Home</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faUserPlus} />
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <Link to="/login">Login</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
