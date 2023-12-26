import React, { createContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
export const userContext = createContext();

function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <userContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
