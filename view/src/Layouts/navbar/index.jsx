import React, { useContext } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { userContext } from "../../context/usercontext";
import FontAwesome from "react-fontawesome";

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

        {user?.role === "admin" ? (
          <NavLink className={"navLink"} to={"/admin"}>
            AdminPage{" "}
          </NavLink>
        ) : (
          ""
        )}
        {user ? (
          <NavLink className={"navLink"} to={"/user"}>
            <i className="fa-solid fa-user"></i> : {user.username}
          </NavLink>
        ) : (
          <>
            <NavLink className={"navLink"} to={"/login"}>
              login
            </NavLink>
            <NavLink className={"navLink"} to={"/signup"}>
              signup
            </NavLink>{" "}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
