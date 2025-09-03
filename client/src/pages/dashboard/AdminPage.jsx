import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import AdminDashboard from "./AdminDashboard";
import Aside from "../../components/admin/Aside";

const AdminPage = () => {
  return (
    <div className="max-h-screen bg-gray-100">
      <Navbar />
      <div className="my-2 mx-2 flex flex-cols-2">
        <Aside />
        <Outlet  />
      </div>
    </div>
  );
};

export default AdminPage;
