import React from "react";
import Navbar from "./navbar/index";
import { Outlet } from "react-router";
import Footer from "./footer";
import UserProvider from "../context/usercontext";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
