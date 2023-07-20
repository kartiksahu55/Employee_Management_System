import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/login&Signup/Signup";
import Login from "./pages/login&Signup/Login";
import NoPage from "./pages/nopage/NoPage";
import User from "./pages/user/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
