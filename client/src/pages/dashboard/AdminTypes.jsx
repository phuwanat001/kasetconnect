import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage";

const AdminTypes = () => {
  const [producttypes, setTypes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // โหลดข้อมูลประเภท  SelectPtype
  useEffect(() => {
    setTimeout(() => {
      fetchTypes();
    }, 1500);
  }, []);

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/product-types"
      );
      const data = response.data.producttypes || response.data || [];
      setTypes(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลประเภทอุปกรณ์ได้");
      setLoading(false);
    }
  };

  // ฟังก์ชันเริ่มแก้ไข
  const startEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  // ฟังก์ชันบันทึกการแก้ไข
  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบก่อนแก้ไขข้อมูล");
        return;
      }
      const response = await axios.put(
        `http://localhost:5000/api/product-types/edit/${id}`,
        { name: editName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        await fetchTypes();
        setEditId(null);
        setEditName("");
        alert("แก้ไขประเภทอุปกรณ์เรียบร้อยแล้ว");
      }
    } catch (err) {
      alert("ไม่สามารถแก้ไขประเภทอุปกรณ์ได้");
    }
  };

  // ฟังก์ชันลบ
  const DeleteTypes = async (id) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประเภทนี้?")) return;
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/product-types/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTypes((prev) => prev.filter((type) => type._id !== id));
        alert("ประเภทอุปกรณ์ถูกลบเรียบร้อยแล้ว");
      }
    } catch (err) {
      console.error("Error deleting type:", err);
      alert("ไม่สามารถลบประเภทอุปกรณ์ได้");
    }
  };

  return (
    <div className="h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8">
      <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-row justify-between items-start mb-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            ประเภทอุปกรณ์
          </h2>
          <Link
            to="/dashboard/addproduct-types"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
          >
            เพิ่มประเภทอุปกรณ์
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 font-semibold">ลำดับ</th>
                <th className="px-4 py-2 font-semibold text-start">ชื่อประเภท</th>
                <th className="px-4 py-2 font-semibold text-center">
                  ตัวเลือก
                </th>
              </tr>
            </thead>
            <tbody>
              {producttypes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="">
                    {loading ? <LoadingPage/> : "ไม่มีข้อมูลประเภทอุปกรณ์"}
                  </td>
                </tr>
              ) : (
                producttypes.map((type, i) => (
                  <tr key={type._id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2 text-center">{i + 1}</td>

                    <td className="border-b px-4 py-2">
                      {editId === type._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border-b rounded px-2 py-1 w-full"
                          autoFocus
                        />
                      ) : (
                        type.name
                      )}
                    </td>
                    <td className="border-b px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {editId === type._id ? (
                          <>
                            <button
                              onClick={() => saveEdit(type._id)}
                              className="px-3 text-sm py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transitio cn cursor-pointer"
                            >
                              บันทึก
                            </button>
                            <button
                              onClick={() => {
                                setEditId(null);
                                setEditName("");
                              }}
                              className="px-3 text-sm py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition cursor-pointer"
                            >
                              ยกเลิก
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(type._id, type.name)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                          >
                            แก้ไข
                          </button>
                        )}
                        <button
                          onClick={() => DeleteTypes(type._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                        >
                          ลบ
                        </button>
                      </div>
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

export default AdminTypes;
