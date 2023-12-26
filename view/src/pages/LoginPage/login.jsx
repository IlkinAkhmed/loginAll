import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setCookie } from "../../../helpers/helper";
import { userContext } from "../../context/usercontext";

function Login() {
  const { token, setUser, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/login/", {
      username: userName,
      password: password,
    });
    const token = res.data;
    const decoded = jwtDecode(token);
    setUser(decoded)
    setToken(token)
    navigate("/user");
    setCookie('token', token, '1h')
  }
  function handleChange(e, handleChanger) {
    e.preventDefault();
    handleChanger(e.target.value);
  }
  return (
    <>
      <i
        className="fa-solid fa-arrow-left"
        style={{ cursor: "pointer", color: "blue", margin: "20px", fontSize: "20px" }}
        onClick={() => navigate("/")}
      >

      </i>
      <h1>Log In</h1>
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
