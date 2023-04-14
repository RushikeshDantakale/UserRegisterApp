import React, { useContext, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalInfo } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const { getUser, userData, isLoggedIn, setIsLoggedIn } =
    useContext(GlobalInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:2000/login", {
        email,
        password,
      });

      const data = response.data;

      getUser(data.user);

      setIsLoggedIn(true);
      navigate("/home");
      toast.success(data.message);
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <div className="container login">
        <div className="login-div">
          <div className="title">LOGIN</div>

          <div className="username-div">
            <div>
              <label> Email</label>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="pass-div">
            <div>
              <label>Password</label>
            </div>
            <div className="input">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn" onClick={postData}>
            LOGIN
          </button>

          <div className="link">
            <div>
              <Link to="/register">New here ? Create new account .</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
