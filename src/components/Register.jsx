import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TextField from "./TextField";
import Header from "./Header";
import Welcome from "./Welcome";
import { setInStorage } from "../utilities/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { url } from "../App";

var Register = () => {
  const [user, setUser] = useState({ fullname: "", email: "", password: "" });
  const notify = (message) =>
      toast.warn(message);
  const navi = useNavigate();

  function createNotes(userId) {
    const notesArray = [];
    const myNotes = {   
      userId: userId,
      notes: notesArray,
    };
   
    axios
      .post(`${url}/notes/add`, myNotes)
  }

  function handleLogin(e) {
    e.preventDefault();
    const myUser = {
      email: user.email,
      password: user.password,
    };

    axios
      .post(`${url}/users/findOne`, myUser)
      .then((res) => {
        if (res.data.success) {
          setInStorage("notekeeper", { token: res.data.token, fullname: res.data.fullname });
          createNotes(res.data.userId);
          navi('/');
        }
      })
      .catch((err) => console.log("Error :" + err));
  }

  function handleRegister(e) {
    e.preventDefault();

    if(user.email === "" || user.fullname === "" || user.password === "") {
      notify("Fill out all the fields!");
      return;
    }

    const myUser = {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
    };

    axios
      .post(`${url}/users/add`, myUser)
      .then((res) => {

        if (res.data.success) {
          notify(res.data.message);
          handleLogin(e);
         
        } else {
          notify(res.data.message);
          setUser({ fullname: "", email: "", password: "" });
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
      <Header link="/login" linkText="Login" />
      <Welcome headerText="Keep your notes with NoteKeeper!"/>
      <form className="login" onSubmit={handleRegister}>
        <h1 className="login"> Sign Up </h1>
        <TextField
          onChange={handleChange}
          name="fullname"
          placeholder="Full Name"
          type="name"
          value={user.fullname}
        />
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
        {/* <Link to="/"> */}
        <button type="submit" alt="Login">
          <AssignmentTurnedInIcon fontSize="large" />
        </button>
        {/* </Link> */}
        <div>
          <p>
            Already a member?
            <Link className="a" to="/login">
              &nbsp; Log In Here!
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Register;
