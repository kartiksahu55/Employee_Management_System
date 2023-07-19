import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/header/NavBar";
import Home from "./pages/home/Home";
import Signup from "./pages/login&Signup/Signup";
import Login from "./pages/login&Signup/Login";
import Logout from "./pages/logout/Logout";
import NoPage from "./pages/nopage/NoPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      setIsLoggedIn(false);
      return <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {isLoggedIn && <NavBar className="nav_bar" logoutUser={logoutUser} />}
      <div className={isLoggedIn ? "route" : "route remove_margin"}>
        <Routes>
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
