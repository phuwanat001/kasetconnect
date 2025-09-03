import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsL = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // โหลดข้อมูลสินค้า
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
        setLoading(false);
        return;
      }

      try {
        setError("");
        const response = await axios.get(
          "http://localhost:5000/api/lessors/products",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const productsData = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];

        setProducts(productsData);
        console.log("โหลดสินค้าเรียบร้อย:", productsData);
      } catch (error) {
        console.error("โหลดสินค้าล้มเหลว:", error);
        setError("ไม่สามารถดึงข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ลบสินค้า
  const btnDelete = async (id) => {
    if (!window.confirm("คุณต้องการลบสินค้านี้หรือไม่?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert("ลบสินค้าเรียบร้อย");
    } catch (error) {
      console.error("ลบสินค้าไม่สำเร็จ:", error);
      setError("ไม่สามารถลบข้อมูลได้");
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  return (
    <div className="ml-3 max-w-screen-xl w-full bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex flex-row justify-between items-center p-2">
        <h1 className="text-xl font-bold">Products</h1>
        <Link
          to="/dashboardl/products/add-product"
          className="px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-700 cursor-pointer text-white text-center"
        >
          เพิ่มอุปกรณ์
        </Link>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center">กำลังโหลดข้อมูล...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto text-lg">
        <table className="min-w-full my-5 border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-2 py-2">ลำดับ</th>
              <th className="px-2 py-2">ชื่อสินค้า</th>
              <th className="px-2 py-2">ราคา</th>
              <th className="px-2 py-2">จำนวน</th>
              <th className="px-2 py-2">สถานะ</th>
              <th className="px-2 py-2">ประเภทสินค้า</th>
              <th className="px-2 py-2">จัดการ</th>
              <th className="px-2 py-2">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">
                  No data
                </td>
              </tr>
            ) : (
              products.map((c, i) => (
                <tr key={c._id} className="hover:bg-blue-50 transition">
                  <td className="border-b text-center px-2 py-2">{i + 1}</td>
                  <td className="border-b text-start px-2 py-2">{c.name}</td>
                  <td className="border-b text-center px-2 py-2">{c.price}</td>
                  <td className="border-b text-center px-2 py-2">{c.stock}</td>
                  <td className="border-b text-center px-2 py-2">{c.status}</td>
                  <td className="border-b text-center px-2 py-2">
                    {c.product_type || c.product_type || "-"}
                  </td>
                  <td className="border-b text-center px-2 py-2 space-x-2">
                    <button
                      onClick={() => btnDelete(c._id)}
                      className="text-white bg-red-500 hover:bg-red-700 px-2 py-0 rounded cursor-pointer"
                    >
                      ลบ
                    </button>
                    <Link
                      to={`/dashboardl/product/edit/${c._id}`}
                      className="text-white bg-green-500 hover:bg-green-700 px-2 py-1 rounded"
                    >
                      แก้ไข
                    </Link>
                  </td>
                  <td className="border-b text-center px-2 py-2">
                    <Link
                      to={`/dashboardl/product/${c._id}`}
                      className="text-white bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded"
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

export default ProductsL;
