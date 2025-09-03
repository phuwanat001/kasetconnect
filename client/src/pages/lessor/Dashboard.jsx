import React from 'react'
import NavbarL from './NavbarL'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <NavbarL/>
      <div className="flex flex-cols-2">
        <Aside/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
