// Login.js
import React, { useState } from "react";
import "../styles/Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      if (res.data.status === "exist") {
        history("/home", { state: { id: username, name: res.data.name } });
      } else if (res.data.status === "notexist") {
        alert("User has not signed up");
      }
    } catch (error) {
      alert("Wrong Credentials");
      console.error(error);
    }
  }

  return (
    <div className="login">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form action="POST">
        <div className="inputs">
          <div className="input">
            <EmailIcon className="img" />
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            ></input>
          </div>
          <div className="input">
            <VisibilityIcon className="img" />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            ></input>
          </div>
        </div>
      </form>

      <div className="submit-container">
        <div className="submit-bttn">
          <input type="submit" className="submit" onClick={submit}></input>
        </div>
        <Link to="/register" className="link">
          <div className="submit">Sign Up</div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
