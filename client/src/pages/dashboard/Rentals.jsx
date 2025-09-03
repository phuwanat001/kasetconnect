import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/rentals",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        setRentals(response.data.rentals || []);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลการเช่าได้");
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  return (
    <div>
      <div className="h-auto w-[1200px] bg-gray-100 py-8 px-2 md:px-8">
        <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            ข้อมูลการเช่า
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
                  <th className="px-4 py-2 font-semibold">ลำดับ</th>
                  <th className="px-4 py-2 font-semibold">ผู้เช่า</th>
                  <th className="px-4 py-2 font-semibold">วันที่เริ่ม</th>
                  <th className="px-4 py-2 font-semibold">วันที่สิ้นสุด</th>
                  <th className="px-4 py-2 font-semibold">สถานะ</th>
                  <th className="px-4 py-2 font-semibold">ค่ามัดจำ</th>
                  <th className="px-4 py-2 font-semibold">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-4">
                      กำลังโหลดข้อมูล...
                    </td>
                  </tr>
                ) : rentals.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      ไม่มีข้อมูลการเช่า
                    </td>
                  </tr>
                ) : (
                  rentals.map((rental, i) => (
                    <tr key={rental._id}>
                      <td className="px-4 py-2 border-b">{i + 1}</td>

                      
                      <td className="px-4 py-2 border-b">
                        {rental.customer ? `${rental.customer.firstName} ${rental.customer.lastName}` : "ไม่ระบุ"}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {new Date(rental.rentalStartDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {new Date(rental.rentalEndDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border-b">{rental.status}</td>
                      <td className="px-4 py-2 border-b text-center">{rental.deposit ? rental.deposit.status : "ไม่พบข้อมูล"}</td>
                      <td className="px-4 py-2 border-b">
                        <Link
                          to={`/dashboard/rental/${rental._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          ดูรายละเอียด
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

export default Rentals;
