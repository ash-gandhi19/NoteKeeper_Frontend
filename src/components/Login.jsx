import React, { useState } from "react";
import TextField from "./TextField";
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import {Link } from "react-router-dom";
import Header from "./Header";
import Welcome from "./Welcome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setInStorage } from "../utilities/storage";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
var Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const notify = (message) =>  toast.warn(message);
  const navi = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if(user.email === "" || user.password === "") {
      notify("Fill out all the fields!");
      return;
    }

    const myUser = {
      email: user.email,
      password: user.password,
    };               

    axios
      .post(`${url}/users/findOne`, myUser)
      .then((res) => {
        if (res.data.success) {
          setInStorage("notekeeper", { token: res.data.token, fullname: res.data.fullname });
          notify(res.data.message);
          setTimeout(navi("/"),2000);
        } else {
          notify(res.data.message);
          setUser({email: "", password: ""});
        }
      })
      .catch((err) => console.log("Error :" + err));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div>
      <Header link="/register" linkText="Register" />
      <Welcome headerText="Keep your notes with NoteKeeper!"/>
      <form className="login" onSubmit={handleLogin}>
        <h1 className="login"> Log In </h1>
        <TextField
          onChange={handleChange}
          value={user.email}
          name="email"
          placeholder="Email"
          type="email"
        />
        <TextField
          onChange={handleChange}
          value={user.password}
          name="password"
          placeholder="Password"
          type="password"
        />
        <button type="submit" alt="Login">
          <LoginIcon fontSize="large" />
        </button>
        <div>
          <p>
            Not yet a member? <Link to="/register"> &nbsp; Sign Up Here! </Link>
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
