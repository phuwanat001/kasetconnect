import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function LessorsRoute({children}) {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/lessors/"/>
    }
  return children ? children : <Outlet/>
  
}

export default LessorsRoute
