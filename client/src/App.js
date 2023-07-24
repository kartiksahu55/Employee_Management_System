import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/login&Signup/Signup";
import Login from "./pages/login&Signup/Login";
import NoPage from "./pages/nopage/NoPage";
import Dashboard from "./pages/user/Dashboard";
import { useState } from "react";

function App() {
  const [userLoggedIn, setuserLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home userLoggedIn={userLoggedIn} />} />
        <Route
          path="/dashboard"
          element={<Dashboard setuserLoggedIn={setuserLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
