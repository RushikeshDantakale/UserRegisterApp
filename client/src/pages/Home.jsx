import React, { useContext } from "react";
import { GlobalInfo } from "../App";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const { userData, getUser } = useContext(GlobalInfo);

  const { name, email, password } = userData;

  console.log(name);

  const [nameUpdate, setNameUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");

  const [isEditClicked, setIsEditClicked] = useState(false);
  const navigate = useNavigate();

  const update = () => {
    // if(con1 && con2)

    if (
      (nameUpdate === "" && passwordUpdate === "") ||
      (passwordUpdate === "" && nameUpdate === "")
    ) {
      toast.error("both input field cannot be empty!");
    } else {
      axios
        .post("http://localhost:2000/update", {
          name: nameUpdate,
          password: passwordUpdate,
          email,
        })

        .then((res) => {
          const data = res.data;

          getUser(data.user);

          toast.success(data.message);
        })

        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  };

  return (
    <>
      <div className="log_out_container">
        <h1>hi, Welcome {name} !</h1>
        <button
          className="btn-logout"
          onClick={() => {
            navigate("/");
            toast.warn("user logout success !");
          }}
        >
          Log out
        </button>
      </div>

      <div className="home_data_container">
        <div className="user_data">
          <div className="user_data_div">
            <div className="user_info">Name</div>

            <div className="user_info">email</div>

            <div className="user_info">password</div>
          </div>

          <div className="user_data_div">
            <div className="user_info_data">{name}</div>

            <div className="user_info_data">{email}</div>

            <div className="user_info_data">{password}</div>
          </div>
          {!isEditClicked && (
            <div className="user_data_div">
              <button
                className="btn_edit"
                onClick={() => setIsEditClicked(!isEditClicked)}
              >
                edit
              </button>
            </div>
          )}

          {isEditClicked && (
            <div className="user_data_div">
              <div className="user_info_data">
                <input
                  type="text"
                  className="input_update"
                  onChange={(e) => setNameUpdate(e.target.value)}
                  placeholder="Enter to update name"
                />
              </div>

              <div className="user_info_data">
                <input
                  type="text"
                  className="input_update"
                  onChange={(e) => setPasswordUpdate(e.target.value)}
                  placeholder="Enter to update password"
                />
              </div>
            </div>
          )}
          {isEditClicked && (
            <div className="update_cancel_div">
              <button className="btn_update" onClick={update}>
                update
              </button>
              <button
                className="btn_cancel"
                onClick={() => setIsEditClicked(!isEditClicked)}
              >
                cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
