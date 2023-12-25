import React, { useContext, useEffect } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import Home from "./../../pages/homePage/home";
import { userContext } from "../../context/usercontext";

function Navbar() {
  const { user } = useContext(userContext);

  return (
    <nav>
      <ul>
        <NavLink className={"navLink"} exact to={"/"}>
          Home
        </NavLink>
        <NavLink className={"navLink"} to={"/contact"}>
          Contact
        </NavLink>

        <NavLink className={"navLink"} to={"/user"}>
          Profile
        </NavLink>
        
      </ul>
    </nav>
  );
}

export default Navbar;
