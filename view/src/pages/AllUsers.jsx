import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helpers/helper";
import { useNavigate } from "react-router";

function AllUsers() {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:8000/users/");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  const navigate = useNavigate();
  const hadleLogin = async (id) => {
    try {
      const token = getCookie("token");

      await axios.delete(`http://localhost:8000/users/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log(`User with ID ${id} deleted.`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <h3
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/admin")}
      >
        BACK
      </h3>
      <h1>Users</h1>
      {users &&
        users
          .filter((user) => user.role !== "admin")
          .map((user) => (
            <div
              style={{
                width: "50%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <h2>Name: {user.username}</h2>
                <h4>Role: {user.role}</h4>
                <h4>Created At: {user.createdAt}</h4>
                <hr />
              </div>
              <button onClick={() => hadleLogin(user._id)}>delete</button>
            </div>
          ))}
    </>
  );
}

export default AllUsers;
