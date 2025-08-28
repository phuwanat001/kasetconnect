import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { currentUser, logout, updateCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    birthdate: "",
    role: "",
    address: {
      street: "",
      city: "",
      country: "",
      zipCode: ""
    }
  });

  // โหลดข้อมูล currentUser ลง formData
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        username: currentUser.username || "",
        birthdate: currentUser.birthdate || "",
        role: currentUser.role || "",
        address: currentUser.address?.[0] || { street: "", city: "", country: "", zipCode: "" }
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">โปรไฟล์ผู้ใช้</h2>
        <p className="text-red-500">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลส่วนตัว</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ถ้าเป็น address
    if (["street", "city", "country", "zipCode"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...formData, address: [formData.address] };
      await axios.put(`http://localhost:5000/api/customers/${currentUser._id}`, updatedUser);

      updateCurrentUser({ ...currentUser, ...updatedUser });
      alert("อัพเดทข้อมูลเรียบร้อยแล้ว");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[var(--primary-green)]">ข้อมูลส่วนตัว</h2>

      <div className="space-y-4">
        {/* ชื่อ และ นามสกุล */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="text-gray-500">ชื่อ</p>
            {isEditing ? (
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
            ) : (
              <p className="text-lg font-semibold">{formData.firstName}</p>
            )}
          </div>
          <div className="w-1/2">
            <p className="text-gray-500">นามสกุล</p>
            {isEditing ? (
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
            ) : (
              <p className="text-lg font-semibold">{formData.lastName}</p>
            )}
          </div>
        </div>

        {/* username */}
        <div>
          <p className="text-gray-500">ชื่อผู้ใช้งาน</p>
          {isEditing ? (
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
          ) : (
            <p className="text-lg font-semibold">{formData.username}</p>
          )}
        </div>

        {/* email */}
        <div>
          <p className="text-gray-500">อีเมล</p>
          {isEditing ? (
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
          ) : (
            <p className="text-lg font-semibold">{formData.email}</p>
          )}
        </div>

        {/* phone */}
        <div>
          <p className="text-gray-500">เบอร์โทรศัพท์</p>
          {isEditing ? (
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
          ) : (
            <p className="text-lg font-semibold">{formData.phone || "-"}</p>
          )}
        </div>

        {/* birthdate */}
        <div>
          <p className="text-gray-500">วันเกิด</p>
          {isEditing ? (
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
          ) : (
            <p className="text-lg font-semibold">{formData.birthdate || "-"}</p>
          )}
        </div>

        {/* address */}
        <div className="space-y-2">
          <p className="text-gray-500">ที่อยู่</p>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="street" placeholder="ถนน/บ้านเลขที่" value={formData.address.street} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
              <input type="text" name="city" placeholder="ตำบล/อำเภอ" value={formData.address.city} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
              <input type="text" name="country" placeholder="จังหวัด" value={formData.address.country} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
              <input type="text" name="zipCode" placeholder="รหัสไปรษณีย์" value={formData.address.zipCode} onChange={handleChange} className="border rounded-md px-3 py-2 w-full" />
            </div>
          ) : (
            <p className="text-lg font-semibold">
              {`${formData.address.street || "-"}, ${formData.address.city || "-"}, ${formData.address.country || "-"}, ${formData.address.zipCode || "-"}`}
            </p>
          )}
        </div>

        {/* role */}
        <div>
          <p className="text-gray-500">สิทธิ์ผู้ใช้งาน</p>
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
            {formData.role}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-6 gap-4">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              บันทึกการเปลี่ยนแปลง
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg">
              ยกเลิก
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            แก้ไขข้อมูล
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
