import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GlobalInfo = createContext();

function App() {
  const [userData, setUserData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUser = (user) => {
    setUserData(user);
  };

  return (
    <GlobalInfo.Provider
      value={{ userData, getUser, isLoggedIn, setIsLoggedIn }}
    >
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </GlobalInfo.Provider>
  );
}

export default App;
