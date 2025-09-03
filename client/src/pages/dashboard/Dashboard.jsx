import React from "react";
import Navbar from "../../components/admin/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
