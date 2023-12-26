import React, { useContext } from "react";
import { userContext } from "../../context/usercontext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

function Admin() {
  const { token, user, setUser, setToken } = useContext(userContext);
  const navigate = useNavigate();

  function handleLogOut() {
    setToken(null);
    setUser(null);
  }
  return (
    <>
      <h1>ADMIN PAGE</h1>
      <div key={user._id}>
        <h2>Name: {user.username}</h2>
        <h4>Role: {user.role}</h4>
        <button onClick={handleLogOut}>Log Out</button><br />
        <button onClick={() => navigate("/users")}>view all users</button>
        <hr />
      </div>
    </>
  );
}

export default Admin;
