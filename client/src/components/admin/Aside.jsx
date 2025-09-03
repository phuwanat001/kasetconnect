import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { IoStorefront } from "react-icons/io5";

const Aside = () => {
  const optionsList = [
    { name: "ภาพรวม", icon: <BiSolidCategory />, path: "/dashboard" },
    {
      name: "จัดการประเภทอุปกรณ์",
      icon: <IoStorefront />,
      path: "/dashboard/product-types",
    },
    {
      name: "เครื่องจักรและอุปกรณ์",
      icon: <IoStorefront />,
      path: "/dashboard/products",
    },
    { name: "ผู้เช่า", icon: <FaUser />, path: "/dashboard/customers" },
    { name: "ผู้ให้เช่า", icon: <FaUser />, path: "/dashboard/lessors" },
    { name: "การเช่า", icon: <FaUser />, path: "/dashboard/rentals" },
    { name: "การคืน", icon: <FaUser />, path: "/dashboard/returns" },
    { name: "การรับ", icon: <FaUser />, path: "/dashboard/receives" },
    {
      name: "สร้างการแจ้งเตือน",
      icon: <FaUser />,
      path: "/dashboard/notifications",
    },
    { name: "ออกจากระบบ", icon: <FaUser />, path: "/admin" }, 
  ];

  return (
    <div className="h-screen min-w-[300px]  bg-gray-100 p-4 flex flex-col gap-y-2">
      <div className="p-10 text-center rounded-md text-xl">สวัสดี : Admin</div>
      <div className="flex flex-col gap-y-2">
        {optionsList.map((option, index) => (
          <NavLink
            key={index}
            to={option.path}
            className={({ isActive }) =>
              `flex items-center gap-x-4 p-2 rounded-md cursor-pointer transition-colors bg-blue-300 text-white text-gray-700 hover:bg-blue-500 shadow-md `
            }
          >
            <span className="text-xl text-white">{option.icon}</span>
            <span className="text-lg">{option.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Aside;
