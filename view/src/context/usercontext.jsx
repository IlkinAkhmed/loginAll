import React, { createContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
export const userContext = createContext();

function UserProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/register/", {
      username: userName,
      password: password
    });
    setToken(res.data);
    navigate("/user");
  }

  return (
    <userContext.Provider
      value={{ token, setToken, setUserName, setPassword, handleSubmit }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
