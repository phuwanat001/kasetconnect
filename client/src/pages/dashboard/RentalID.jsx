import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RentalID = () => {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRental = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/admin/rental/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        setRental(res.data.rental || res.data);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "ไม่พบข้อมูลการเช่า"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!rental)
    return (
      <div className="p-8 text-center text-gray-500">ไม่พบข้อมูลการเช่า</div>
    );

  return (
    <div className="h-auto w-[1000px] bg-gray-100 py-8 px-2 md:px-8">
      <div className="bg-white rounded-xl shadow-lg flex flex-col p-6 ">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          📄 ข้อมูลการเช่า
        </h2>

        <div className="flex flex-col gap-4">
          {/* ผู้ให้เช่า */}
          <div className="mb-2 flex items-center gap-2">
            🧍‍♂️ <strong>ผู้ให้เช่า:</strong>
            {rental.product?.createdBy?.firstName || "-"}
          </div>

          {/* ผู้เช่า */}
          <div className="mb-2 flex items-center gap-2">
            🧍 <strong>ผู้เช่า:</strong>
            {rental.customer?.firstName || "-"}
          </div>

          {/* วันที่เริ่ม */}
          <div className="mb-2 flex items-center gap-2">
            📅 <strong>วันที่เริ่ม:</strong>
            {rental.rentalStartDate
              ? new Date(rental.rentalStartDate).toLocaleDateString("th-TH")
              : "-"}
          </div>

          {/* วันที่สิ้นสุด */}
          <div className="mb-2 flex items-center gap-2">
            📅 <strong>วันที่สิ้นสุด:</strong>
            {rental.rentalEndDate
              ? new Date(rental.rentalEndDate).toLocaleDateString("th-TH")
              : "-"}
          </div>

          {/* สินค้า */}
          <div className="mb-2 flex items-center gap-2">
            📦 <strong>สินค้า:</strong>
            {rental.product?.name || "-"}
          </div>

          {/* จำนวน */}
          <div className="mb-2 flex items-center gap-2">
            💰 <strong>จำนวน:</strong>
            {rental.quantity ? `${rental.quantity} ชิ้น` : "-"}
          </div>

          {/* ราคารวม */}
          <div className="mb-2 flex items-center gap-2">
            💰 <strong>ราคารวม:</strong>
            {rental.totalPrice ? `${rental.totalPrice} บาท` : "-"}
          </div>

          {/* สถานะ */}
          <div className="mb-2 flex items-center gap-2">
            📦 <strong>สถานะ:</strong>
            {rental.status || "-"}
          </div>
        </div>

        <Link
          to="/dashboard/rentals"
          className="px-3 py-2 mt-10 w-30 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white rounded-md transition-all"
        >
          ⬅️ กลับ
        </Link>
      </div>
    </div>
  );
};

export default RentalID;
