import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Lessors = () => {
  const [lessors, setLessors] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchLessors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/lessors",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setLessors(response.data.lessors || []);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลผู้ให้เช่าได้");
      }
    };
    fetchLessors();
  }, []);

  return (
    <div className="min-h-auto w-[1500px] bg-gray-100 py-8 px-2 md:px-8">
      <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          ข้อมูลผู้ให้เช่า
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="overflow-x-auto text-lg">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-2 py-2 font-normal text-l">ลำดับ</th>
                  <th className="px-2 py-2 font-normal text-l">ชื่อ</th>        
                  <th className="px-2 py-2 font-normal text-l">นามสกุล</th>
                  <th className="px-2 py-2 font-normal text-l">อีเมล</th>
                  <th className="px-2 py-2 font-normal text-l">เบอร์โทร</th>

                  <th className="px-2 py-2 font-normal text-l">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {lessors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400">
                      กำลังโหลดข้อมูลผู้ให้เช่า...
                    </td>
                  </tr>
                ) : (
                  lessors.map((c, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition">

                      <td className="border-b px-2 py-2 text-center">{i+1}</td>
                      <td className="border-b px-2 py-2 text-center">{c.firstName}</td>
                      <td className="border-b px-2 py-2 text-center">{c.lastName}</td>
                      <td className="border-b px-2 py-2 text-center">{c.email}</td>
                      <td className="border-b px-2 py-2 text-center">{c.phone}</td>

                      <td className="border-b px-2 py-2 text-center ">
                        <Link
                          to={`/dashboard/lessor/${c._id}`}
                          className="text-white text-sm bg-blue-500 hover:bg-blue-700 px-2 py-2 rounded cursor-pointer"
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
    </div>
  );
};

export default Lessors;
