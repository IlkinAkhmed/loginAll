import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/usercontext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { getCookie } from "../../../helpers/helper";

function User() {
  const { user, setToken, setUser } = useContext(userContext);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");


  // Update user
  async function handleUpdate(e, id) {
    e.preventDefault()
    if (!editUsername || !editPassword) {
      alert("username or password cannot be empty character")
      return
    }
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
      setEditUsername('')
      setEditPassword('')
      setIsFormOpen(!isFormOpen);
    } catch (error) {
      console.error(error.message);
    }
    const res = await axios.get(`http://localhost:8000/users/${id}`);
    setUser({ _id: res.data._id, username: res.data.username, role: res.data.role });
  }

  function handleInputChange(e, setState) {
    e.preventDefault();
    setState(e.target.value);
  }

  // logOut
  function handleLogOut() {
    setToken(null);
    setUser(null);
  }
  return (
    <>
      <div key={user._id}>
        <h2>Name: {user.username}</h2>
        <h4>Role: {user.role}</h4>
        <h4>UserId: <i>{user._id}</i></h4>
        <button onClick={handleLogOut}>Log Out</button>
        <button style={{ marginLeft: '10px' }} onClick={() =>
          setIsFormOpen(!isFormOpen)
        }>Edit profile</button>
        <hr />
        <form
          style={{
            backgroundColor: "gray",
            color: "white"
          }}
          onSubmit={(e) => handleUpdate(e, user._id)}
          className={
            isFormOpen ? "editForm active" : "editForm"
          }
          action=""
        >
          <i onClick={() => setIsFormOpen(!isFormOpen)} className="fa-solid fa-xmark"></i>
          <label htmlFor="">Username</label>
          <br />
          <input
            value={editUsername}
            onChange={(e) => handleInputChange(e, setEditUsername)}
            type="text"
          />
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input
            value={editPassword}
            onChange={(e) => handleInputChange(e, setEditPassword)}
            type="password"
          />
          <br />
          <input style={{ marginTop: "10px" }} type="submit" />
        </form>
      </div >
    </>
  );
}

export default User;
