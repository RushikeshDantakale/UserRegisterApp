import React, { useContext, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalInfo } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const { getUser } = useContext(GlobalInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const postData = () => {
    axios
      .post("http://localhost:2000/register", { name, email, password })
      .then((res) => {
        const data = res.data;
        getUser(data.user);
        navigate("/home");
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <>
      <div className="container login">
        <div className="register-div">
          <div className="title">Register</div>

          <div className="username-div">
            <div>
              <label> Name</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="username-div">
            <div>
              <label> Email</label>
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
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
                placeholder="Enter password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn" onClick={postData}>
            Register
          </button>

          <div className="link">
            <div>
              {" "}
              <Link to="/"> Already Registered ? Go to login .</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
