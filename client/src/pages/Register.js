import "../styles/Register.css";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Password:", password);

    if (!name || !username || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios
        .post("http://localhost:8000/register", {
          name,
          username,
          password,
        })
        .then((res) => {
          if (res.data.status === "exist") {
            alert("User already exist");
          } else if (res.data.status === "notexist") {
            history("/home", { state: { id: username, name } });
          }
        })
        .catch((e) => {
          alert("Wrong Credentials");
          console.log(e);
        });
    } catch (error) {}
  }

  return (
    <div className="login">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="undeline"></div>
      </div>
      <form action="POST">
        <div className="inputs">
          <div className="input">
            <PersonIcon className="img" />
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            ></input>
          </div>
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
        <Link to="/login" className="link">
          <div className="submit">Login</div>
        </Link>
      </div>
    </div>
  );
}

export default Register;
