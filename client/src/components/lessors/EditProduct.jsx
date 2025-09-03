import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    status: "available",
    product_type: "",
    image: null,
  });

  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลสินค้าและประเภทสินค้า
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("ไม่พบ token กรุณาเข้าสู่ระบบใหม่");
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data?.product || res.data || {};
        setForm({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          stock: data.stock || "",
          status: data.status || "available",
          product_type: data.product_type || "",
          image: null,
        });
      } catch (err) {
        console.error("โหลดสินค้าล้มเหลว:", err);
        alert("ไม่สามารถโหลดข้อมูลสินค้าได้");
        navigate("/dashboardl/products");
      } finally {
        setLoading(false);
      }
    };

    const fetchProductTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product-types");
        const types =
          Array.isArray(res.data) ? res.data : res.data.productTypes || [];
        setProductTypes(types);
      } catch (err) {
        console.error("โหลดประเภทสินค้าล้มเหลว:", err);
        alert("ไม่สามารถโหลดประเภทสินค้าได้");
      }
    };

    fetchProduct();
    fetchProductTypes();
  }, [id, navigate]);

  // เปลี่ยนค่าฟอร์ม
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "image" && files?.[0] ? files[0] : value,
    }));
  };

  // อัปเดตสินค้า
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      await axios.put(
        `http://localhost:5000/api/products/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("บันทึกข้อมูลเรียบร้อย");
      navigate("/dashboardl/products");
    } catch (err) {
      console.error("อัปเดตล้มเหลว:", err.response?.data || err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  if (loading)
    return <p className="text-center py-6">⏳ กำลังโหลดข้อมูล...</p>;

  return (
    <div className="ml-3 h-auto max-w-screen-xl w-full bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">แก้ไขสินค้า</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ชื่อสินค้า */}
        <div>
          <label className="block text-gray-600 mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="ชื่อสินค้า"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ราคา */}
        <div>
          <label className="block text-gray-600 mb-1">ราคา</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="ราคา"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* รายละเอียด */}
        <div>
          <label className="block text-gray-600 mb-1">รายละเอียด</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="รายละเอียดสินค้า"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />
        </div>

        {/* จำนวนคงเหลือ */}
        <div>
          <label className="block text-gray-600 mb-1">จำนวนคงเหลือ</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="จำนวนคงเหลือ"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* สถานะ */}
        <div>
          <label className="block text-gray-600 mb-1">สถานะ</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="available">พร้อมใช้งาน</option>
            <option value="unavailable">ไม่พร้อมใช้งาน</option>
          </select>
        </div>

        {/* ประเภทสินค้า */}
        <div>
          <label className="block text-gray-600 mb-1">ประเภทสินค้า</label>
          <select
            name="product_type"
            value={form.product_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">{form.product_type}</option>
            {productTypes.map((type) => (
              <option key={type._id || type} value={type._id || type}>
                {type.name || type}
              </option>
            ))}
          </select>
        </div>

        {/* รูปสินค้า */}
        <div>
          <label className="block text-gray-600 mb-1">รูปสินค้า</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboardl/products")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
