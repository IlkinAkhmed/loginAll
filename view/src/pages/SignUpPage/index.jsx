import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/usercontext";

function SignUp() {
  const { setUserName, setPassword, handleSubmit } = useContext(userContext);
  function handleChange(e, handleChanger) {
    e.preventDefault();
    if (e.target.value !== 0) {
      handleChanger(e.target.value);
    } else {
      alert("imput must not be empty");
    }
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
