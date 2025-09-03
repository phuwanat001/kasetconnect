import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { IoStorefront } from "react-icons/io5";

const Aside = () => {
  const optionsList = [
    { name: "ภาพรวม", icon: <BiSolidCategory />, path: "/dashboardl" },

    {
      name: "เครื่องจักรและอุปกรณ์",
      icon: <IoStorefront />,
      path: "/dashboardl/products",
    },
    { name: "ปฎิทินการจอง", icon: <FaUser />, path: "/dashboardl/datetime" },
    { name: "การเช่า", icon: <FaUser />, path: "/dashboardl/rentals" },
    { name: "การคืน", icon: <FaUser />, path: "/dashboardl/returns" },
    { name: "การรับ", icon: <FaUser />, path: "/dashboardl/receives" },
    { name: "จัดการช่องทางชำระเงิน", icon: <FaUser />, path: "/dashboardl/payments" },
    { name: "ติดต่อแอดมิน", icon: <FaUser />, path: "/dashboardl/contact-admin" },
    { name: "ออกจากระบบ", icon: <FaUser />, path: "/lessors" }, 
  ];


  return (
    <div className="h-screen min-w-[300px] bg-gray-100 p-4 flex flex-col gap-y-2">
      <div className="p-10 text-center rounded-md text-xl">สวัสดี : </div>
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
