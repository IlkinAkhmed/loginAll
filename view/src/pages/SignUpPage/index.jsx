import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../../helpers/helper";
import { userContext } from "../../context/usercontext";

function SignUp() {
  const {token, setUser,setToken } = useContext(userContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(e, handleChanger) {
    e.preventDefault();
    if (e.target.value !== 0) {
      handleChanger(e.target.value);
    } else {
      alert("imput must not be empty");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/register/", {
      username: userName,
      password: password,
    });

    const token = res.data;
    const decoded = jwtDecode(token);
    setUser(decoded)
    setToken(token)
    navigate("/user");
  }
  return (
    <>
      <h1>Sign Up</h1>
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
        <button type="submit">Sign up</button>
        <br />
        <Link style={{ textDecoration: "underline" }} to={"/login"}>
          You have an account?
        </Link>
      </form>
    </>
  );
}

export default SignUp;
