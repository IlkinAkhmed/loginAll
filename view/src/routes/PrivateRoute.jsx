import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { userContext } from "../context/usercontext";

function PrivateRoute({check}) {
  const { user } = useContext(userContext);
 
  return check.includes(user?.role) &&  user ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
