import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RentalsL = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  // ฟังก์ชันอนุมัติการเช่า
  const approveRental = async (rentalId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
        return;
      }

      // เรียก API อัปเดตสถานะ
      await axios.put(
        `http://localhost:5000/api/lessors/rentals/${rentalId}`,
        { status: "อนุมัติแล้ว" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // อัปเดตสถานะใน state ให้แสดงผลทันที
      setRentals((prev) =>
        prev.map((r) =>
          r._id === rentalId ? { ...r, status: "อนุมัติแล้ว" } : r
        )
      );
    } catch (err) {
      console.error("Error approving rental:", err);
      setError("ไม่สามารถอนุมัติการเช่าได้");
    }
  };


  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/lessors/rentals",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data.rentals || [];
        setRentals(data);
        console.log("Rentals:", data);
        setLoading(false);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลการเช่าได้");
        console.error("Error fetching rentals:", error);
        setLoading(false);
      }
    };

    fetchRentals();
  }, [id]);

  if (loading) return <p className="text-center">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="ml-3 max-w-screen-xl w-full bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold">Rentals</h1>
      <div className="overflow-x-auto text-lg">
        <table className="min-w-full my-5 border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">ลำดับ</th>
              <th className="py-2 px-4 border-b">ชื่อผู้เช่า</th>
              <th className="py-2 px-4 border-b">วันที่เริ่มต้น</th>
              <th className="py-2 px-4 border-b">วันที่สิ้นสุด</th>
              <th className="py-2 px-4 border-b">สถานะ</th>
              <th className="py-2 px-4 border-b">อนุมัติการเช่า</th>
              <th className="py-2 px-2 border-b">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {rentals.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  ไม่มีข้อมูลการเช่า
                </td>
              </tr>
            ) : (
              rentals.map((rental, i) => (
                <tr key={rental._id}>
                  <td className="border-b text-center px-2 py-2">{i + 1}</td>
                  <td className="border-b text-center px-2 py-2">
                    {rental.customer ? rental.customer.firstName : "-"}
                  </td>
                  <td className="border-b text-center px-2 py-2">
                    {new Date(rental.startDate).toLocaleDateString()}
                  </td>
                  <td className="border-b text-center px-2 py-2">
                    {new Date(rental.endDate).toLocaleDateString()}
                  </td>
                  <td className="border-b text-center px-2 py-2">
                    {rental.status}
                  </td>
                  <td className="border-b text-center px-2 py-2">
                    <button
                      onClick={() => approveRental(rental._id)}
                      disabled={rental.status === "อนุมัติแล้ว"}
                      className={`px-2 py-2 rounded-md text-center ${
                        rental.status === "อนุมัติแล้ว"
                          ? "text-gray-400 disabled:cursor-not-allowed"
                          : "text-green-500 cursor-pointer hover:text-green-700 hover:underline"
                      }`}
                    >
                      {rental.status === "อนุมัติแล้ว"
                        ? "อนุมัติแล้ว"
                        : "อนุมัติ"}
                    </button>
                  </td>
                  <td className="border-b text-center px-2 py-2">
                    <Link
                      to=""
                      className="text-blue-500 hover:text-blue-700 hover:underline rounded-md text-center"
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
  );
};

export default RentalsL;
