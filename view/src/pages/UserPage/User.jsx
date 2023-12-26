import React, { useContext } from "react";
import { userContext } from "../../context/usercontext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

function User() {
  const { user, setToken, setUser } = useContext(userContext);
  const navigate = useNavigate();

  function handleLogOut() {
    setToken(null);
    setUser(null);
  }
  return (
    <>
      <div key={user._id}>
        <h2>Name: {user.username}</h2>
        <h4>Role: {user.role}</h4>
        <button onClick={handleLogOut}>Log Out</button>
        <hr />
      </div>
    </>
  );
}

export default User;
