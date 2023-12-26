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
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#0F0D10", color: "white" }}>
      <i
        className="fa-solid fa-arrow-left"
        style={{ cursor: "pointer", color: "blue", margin: "20px", fontSize: "20px" }}
        onClick={() => navigate("/")}
      >

      </i>
      <div style={{ textAlign: "center" }}>
        <h1>ADMIN PAGE</h1>
        <h2>Name: {user.username}</h2>
        <h4>Role: {user.role}</h4>
        <button onClick={handleLogOut}>Log Out</button><br />
        <button onClick={() => navigate("/users")}>view all users</button>
      </div>
    </div>
  );
}

export default Admin;
