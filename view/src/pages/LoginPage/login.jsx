import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/usercontext";
import { useNavigate } from "react-router";
import User from "../UserPage/User";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../../helpers/helper";

function Login() {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/login/", {
      username: userName,
      password: password
    });
    setToken(res.data);
    setCookie("token", res.data, "300s");

    navigate("/user");
  }
  function handleChange(e, handleChanger) {
    e.preventDefault();
    handleChanger(e.target.value);
  }
  return (
    <>
      <h1>Log In</h1>
      <Link to={"/"}>Back</Link>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          <b>UserName: </b>
        </label>
        <input type="text" onChange={(e) => handleChange(e, setUserName)} />
        <br />
        <label htmlFor="">
          <b>Password: </b>
        </label>
        <input type="password" onChange={(e) => handleChange(e, setPassword)} />
        <br />
        <button type="submit">Log in</button>
        <br />
        <Link to={"/sign-up"}>create new account</Link>
      </form>
    </>
  );
}

export default Login;
