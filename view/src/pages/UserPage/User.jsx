import React, { useContext } from "react";
import { userContext } from "../../context/usercontext";
import { jwtDecode } from "jwt-decode";

function User() {
  const { token, setToken } = useContext(userContext);
  const decoded = jwtDecode(token);
  localStorage.setItem("user", decoded);

  function handleLogOut() { 
    setToken(null);
  }
  return (
    <>
      <div key={decoded._id}>
        <h2>Name: {decoded.username}</h2>
        <h4>Role: {decoded.role}</h4>
        <button onClick={handleLogOut}>Log Out</button>
        <hr />
      </div>
    </>
  );
}

export default User;
