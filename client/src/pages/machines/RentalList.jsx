import React, { useEffect, useState } from "react";
import axios from "axios";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // โหลดข้อมูลการเช่า
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/rentals/customer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // จัดรูปแบบข้อมูลให้ใช้ images และมี status
        const formatted = res.data.all_rentals.map(r => ({
          ...r,
          status: r.status || "pending",
          product: {
            ...r.product,
            image: r.product.images?.[0] || "/placeholder.jpg",
          },
        }));

        setRentals(formatted);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  // Mapping สถานะเป็นภาษาไทย
  const statusMap = {
    all: "ทั้งหมด",
    pending: "รออนุมัติ",
    confirmed: "การรับ",
    returned: "การคืน",
    completed: "สำเร็จแล้ว",
    cancelled: "ยกเลิกแล้ว",
  };

  // Filter ตาม tab
  const filteredRentals =
    activeTab === "all"
      ? rentals
      : rentals.filter(r => r.status === activeTab);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">รายการเช่า</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {Object.keys(statusMap).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500"
            }`}
          >
            {statusMap[tab]}
          </button>
        ))}
      </div>

      {/* รายการเช่า */}
      {filteredRentals.length > 0 ? (
        filteredRentals.map(rental => (
          <div
            key={rental._id}
            className="bg-white shadow rounded-lg p-4 flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={rental.product.image}
                alt={rental.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{rental.product.name}</h2>
                <p>{rental.product.price} บาท/วัน</p>
                <p>x{rental.quantity}</p>
                <p className="text-sm text-gray-500">
                  สถานะ: {statusMap[rental.status] || "ไม่ทราบ"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                ดูรายละเอียด
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                ยกเลิกการจอง
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">ไม่มีข้อมูลการเช่า</p>
      )}
    </div>
  );
};

export default RentalList;
