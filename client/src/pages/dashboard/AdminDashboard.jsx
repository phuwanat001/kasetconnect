import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/admin/Navbar";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/customers",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setCustomers(response.data.customers || []);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลลูกค้าได้");
      }
    };
    fetchCustomers();
  }, []);


  return (
  <div className="min-h-auto w-[1500px] bg-gray-100 py-8 px-2 md:px-8">

      <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
     
  <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Customers List
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-2 py-2 font-semibold">ลำดับ</th>
                <th className="px-4 py-2 font-semibold">ชื่อ</th>
                <th className="px-4 py-2 font-semibold">นามสกุล</th>
                <th className="px-5 py-2 font-semibold text-start">อีเมล</th>
                <th className="px-5 py-2 font-semibold text-start">เบอร์โทรศัพท์</th>
                <th className="px-4 py-2 font-semibold">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    กำลังโหลดข้อมูลผู้เช่า...
                  </td>
                </tr>
              ) : (
                customers.map((c, i) => (
                  <tr key={i} className="hover:bg-blue-50 transition">
                    <td className="border-y-1 px-2 py-2 text-center">{i+1}</td>
                    <td className="border-y-1 px-2 py-2">{c.firstName}</td>
                    <td className="border-y-1 px-2 py-2">{c.lastName}</td>
                    <td className="border-y-1 px-5 py-2">{c.email}</td>
                    <td className="border-y-1 px-5 py-2">{c.phone}</td>
                    
                   
                    <td className="border-y-1 px-2 py-2 text-center ">
                      <Link
                        to={`/dashboard/customer/${c._id}`}
                        className="text-white text-sm bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded cursor-pointer"
                      >
                        เพิ่มเติม 
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
