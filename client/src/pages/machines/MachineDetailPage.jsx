import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getImgUrl } from "../../utils/getImgUrl";
import { useAuth } from "../../context/AuthContext";
import { addToCart } from "../../redux/features/cart/cartSlice";
import React from "react";

const MachineDetailPage = () => {
  const { id } = useParams(); 
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryMap = {
    "688f33e595b62613b179a3b0": "เครื่องจักรเตรียมดิน",
    "688f34f795b62613b179a3b2": "เครื่องจักรปลูกพืช",
    "688f36c38807c6067eb1f192": "ระบบให้น้ำ/เครื่องจักรชลประทาน",
    "68939df421a47768535c175f": "เครื่องจักรดูแลรักษาพืช",
    "689ae14e2067200086dde897": "เครื่องจักรเก็บเกี่ยว",
    "689ae15b2067200086dde89a": "เครื่องจักรหลังการเก็บเกี่ยว"
  }

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setMachine(res.data);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลได้");
        setLoading(false);
      }
    };
    fetchMachine();
  }, [id]);

  if (loading) return <p className="text-center mt-5">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;
  if (!machine) return <p className="text-center mt-5">ไม่พบข้อมูล</p>;

  const availableCount = machine.availableCount ?? (machine.status === "available" ? machine.stock : 0);
  const unavailableCount = (machine.stock ?? 0) - availableCount;
  const isAvailable = availableCount > 0;

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบเพื่อเพิ่มสินค้าในตะกร้า");
      return;
    }
    dispatch(addToCart(machine));
  };

  const handleBooking = () => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบเพื่อทำการจอง");
      return;
    }
    navigate("/rental",{state: {machine: {...machine, quantity: 1}}});
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-6">
        <div className="flex-shrink-0 w-96">
          <img
            src={getImgUrl(machine.coverImage || machine.image)}
            alt={machine.name}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{machine.name}</h1>
            <p className="text-sm text-gray-500 mb-1">ผู้ให้บริการ Rentconn</p>
            <p className="text-gray-700 whitespace-pre-wrap mb-3">{machine.description}</p>
            <p className="text-gray-700 mb-1">
              <strong>หมวดหมู่ :</strong> {categoryMap[machine.product_type] || '-'}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>สถานะ :</strong>{" "}
              {isAvailable ? (
                <span className="text-green-600">ว่าง {availableCount} คัน</span>
              ) : (
                <span className="text-red-600">ไม่ว่าง</span>
              )}
              {unavailableCount > 0 && (
                <span className="ml-2 text-gray-600">(ไม่ว่าง {unavailableCount} คัน)</span>
              )}
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`flex-grow py-2 rounded transition ${
                isAvailable
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              เพิ่มใส่ตะกร้า
            </button>

            <button
              onClick={handleBooking}
              disabled={!isAvailable}
              className={`flex-grow py-2 rounded transition ${
                isAvailable
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              จอง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailPage;
