import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/header/NavBar";
import Home from "./pages/home/Home";
import Signup from "./pages/loginOrSignup/Signup";
import Login from "./pages/loginOrSignup/Login";
import Logout from "./pages/logout/Logout";
import NoPage from "./pages/nopage/NoPage";

function App() {
  return (
    <div className="App">
      <NavBar className="nav_bar" />
      <div className="route">
        <Routes>
          <Route path="/" element={<Home />} />
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
