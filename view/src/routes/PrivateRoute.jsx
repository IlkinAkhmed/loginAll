import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { userContext } from '../context/usercontext'

function PrivateRoute() {
  const { token } = useContext(userContext)
  return (
    token ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default PrivateRoute