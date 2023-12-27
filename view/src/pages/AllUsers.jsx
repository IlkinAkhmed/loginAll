import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helpers/helper";
import { useNavigate } from "react-router";
import "./AllUsers.scss";

function AllUsers() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const navigate = useNavigate();

  // fetc all userss
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

  // Delete function
  const hadleDelete = async (id) => {
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

  // Update user
  async function hadleUpdate(id) {
    try {
      const token = getCookie("token");
      await axios.put(
        `http://localhost:8000/users/${id}`,
        {
          username: editUsername,
          password: editPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setEditUserId(id === editUserId ? null : id);
      setIsFormOpen(!isFormOpen);
    } catch (error) {
      console.error(error.message);
    }
  }

  function hanleEditChange(e, handleChanger) {
    e.preventDefault();
    if (e.target.value !== 0) {
      handleChanger(e.target.value);
    } else {
      alert("imput must not be empty");
    }
  }
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "50px 0",
        backgroundColor: "#0F0D10",
        color: "white",
      }}
    >
      <i
        className="fa-solid fa-arrow-left"
        style={{
          cursor: "pointer",
          color: "blue",
          margin: "20px",
          fontSize: "20px",
        }}
        onClick={() => navigate("/admin")}
      ></i>
      <h1>Users</h1>
      <i> ({users.length - 1}-user)</i>
      <div
        className="wraper"
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search By Name..."
          style={{ height: "30px" }}
        />
        {users &&
          users
            .filter((user) =>
              user.username
                .toLowerCase()
                .trim()
                .includes(input.toLowerCase().trim())
            )
            .filter((user) => user.role !== "admin")
            .map((user) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                }}
              >
                <form
                  onSubmit={hadleUpdate}
                  className={
                    editUserId === user._id ? "editForm active" : "editForm"
                  }
                  action=""
                >
                  <label htmlFor="">Username</label>
                  <br />
                  <input
                    onChange={(e) => hanleEditChange(e, setEditUsername)}
                    type="text"
                  />
                  <br />
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    onChange={(e) => hanleEditChange(e, setEditPassword)}
                    type="password"
                  />
                  <br />
                  <button onClick={() => hadleUpdate(user._id)} type="submit">
                    Save
                  </button>
                </form>
                <div>
                  {" "}
                  <h2>Name: {user.username}</h2>
                  <h4>UserId: {user._id}</h4>
                  <h4>Role: {user.role}</h4>
                  <h4>Created At: {user.createdAt}</h4>
                  <hr />
                </div>
                <div>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => hadleDelete(user._id)}
                  >
                    delete
                  </button>
                  <button onClick={() => hadleUpdate(user._id)}>Edit</button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default AllUsers;
