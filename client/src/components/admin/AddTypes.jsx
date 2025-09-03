import React from "react";
import axios from "axios"; // ✅ ต้อง import axios
import { Link } from "react-router-dom";

const AddTypes = () => {
  const [productType, setProductType] = React.useState("");

  const handleAddType = async (e) => {
    e.preventDefault(); // ป้องกันการ reload หน้า
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/product-types/create-product-type",
        {
          name: productType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("ประเภทอุปกรณ์ถูกเพิ่มเรียบร้อยแล้ว");
        setProductType(""); // ล้างช่อง input
      }
    } catch (error) {
      console.error("Error adding product type:", error);
      alert("ไม่สามารถเพิ่มประเภทอุปกรณ์ได้");
    }
  };

  return (
    <div className="min-h-screen w-[500px] bg-gray-100 py-8 px-2 md:px-8 ">
      <div className="max-w-[1000px] mx-auto bg-white rounded-xl shadow-lg p-6">
        <form className="flex flex-col gap-4" onSubmit={handleAddType}>
          <label className="text-lg font-semibold">ชื่อประเภทอุปกรณ์</label>
          <input
            type="text"
            value={productType}
            placeholder="กรุณากรอกชื่อประเภทอุปกรณ์"
            onChange={(e) => setProductType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            type="submit"
            disabled={!productType}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 "
          >
            เพิ่มประเภทอุปกรณ์
          </button>
        </form>
        <Link to ="/dashboard/product-types" className="text-blue-500 mt-4 inline-block">
         กลับไปที่หน้าประเภทอุปกรณ์
        </Link>
      </div>
    </div>
  );
};

export default AddTypes;
