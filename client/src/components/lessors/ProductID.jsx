import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProductLID = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
 
  const getToken = () => localStorage.getItem("token");

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProduct(data.product || data);
    } catch (err) {
      setError(err.response?.data?.message || "ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading)
    return <p className="text-center text-lg mt-10">⏳ กำลังโหลด...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center">ไม่พบสินค้า</p>;

  const formatDate = (date) =>
    new Date(date).toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="ml-3 h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Product Details</h1>

      <h2 className="text-lg font-semibold">{product.name || "ไม่มีชื่อ"}</h2>
      <p>💰 ราคา: {product.price?.toLocaleString() || "ไม่มีราคา"}</p>
      <p>📜 รายละเอียด: {product.description || "ไม่มีรายละเอียด"}</p>
      <p>📦 Stock: {product.stock ?? "-"}</p>
      <p>📌 Status: {product.status ?? "-"}</p>
      <p>🏷️ ประเภทสินค้า: {product.product_type || "-"}</p>

      <div className="my-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-48 h-48 object-cover border rounded"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded">
            ไม่มีภาพ
          </div>
        )}
      </div>

      <p>🗓️ Created: {product.createdAt ? formatDate(product.createdAt) : "-"}</p>
      <p>🔄 Updated: {product.updatedAt ? formatDate(product.updatedAt) : "-"}</p>

      <div className="mt-6 space-x-2">
        <Link
          to="/dashboardl/products"
          className="text-white rounded-md bg-blue-500 hover:bg-blue-700 px-3 py-2"
        >
          ย้อนกลับ
        </Link>
        <Link
          to={`/dashboardl/product/edit/${id}`}
          className="text-white rounded-md bg-green-500 hover:bg-green-600 px-3 py-2"
        >
          แก้ไข
        </Link>
      </div>
    </div>
  );
};

export default ProductLID;
