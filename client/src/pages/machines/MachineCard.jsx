import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useAuth } from '../../context/AuthContext'

const MachineCard = ({ machine }) => {
  const categoryMap = {
    "688f33e595b62613b179a3b0": "เครื่องจักรเตรียมดิน",
    "688f34f795b62613b179a3b2": "เครื่องจักรปลูกพืช",
    "688f36c38807c6067eb1f192": "ระบบให้น้ำ/เครื่องจักรชลประทาน",
    "68939df421a47768535c175f": "เครื่องจักรดูแลรักษาพืช",
    "689ae14e2067200086dde897": "เครื่องจักรเก็บเกี่ยว",
    "689ae15b2067200086dde89a": "เครื่องจักรหลังการเก็บเกี่ยว"
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  if (!machine) return null

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบเพื่อเพิ่มสินค้าในตะกร้า");
    } else {
      dispatch(addToCart(machine));
    }
  }

  const handleBooking = () => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบเพื่อทำการจอง");
    } else {
      navigate('/rental', { state: { machine } });
    }
  }

  // สมมุติว่า machine มีค่า availableCount กับ unavailableCount
  const availableCount = machine.availableCount ?? machine.stock // fallback เป็น stock
  const unavailableCount = (machine.stock ?? 0) - availableCount

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full min-h-[450px]">
      
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <div className="flex justify-center flex-grow">
        <img
          src={machine.image}
          alt={machine.name || 'Machine Image'}
          className="w-40 h-40 object-contain mb-4"
        />
      </div>

      <p className="text-sm text-gray-400">{categoryMap[machine.product_type] || '-'}</p>

      <Link to={`/machines/${machine._id}`}>
        <h2 className="text-xl font-semibold mb-2">{machine.name}</h2>
      </Link>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-800 mb-2">
        <div>
          <span className="font-medium">{machine.price} บาท</span> / วัน
        </div>
        <div className="font-medium">ความพึงพอใจ</div>

        {/* แสดงสถานะว่าง/ไม่ว่าง */}
        <div>
          {availableCount > 0 ? (
            <span className="text-green-600">ว่าง {availableCount} คัน</span>
          ) : (
            <span className="text-red-600">ไม่ว่าง</span>
          )}
          <span className="ml-2 text-gray-600">(ไม่ว่าง {unavailableCount} คัน)</span>
        </div>

        <div className="flex items-center">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
          <FaStar className="text-gray-300" />
        </div>
      </div>

      <div className="mt-auto flex justify-between gap-4">
        {/* ปุ่มจอง ถ้าไม่มีเครื่องว่าง จะ disable และสีเทา */}
        {availableCount > 0 ? (
          <Link
            to="/rental"
            state={{machine}}
            onClick={handleBooking}
            className="flex-1 text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            จองตอนนี้
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 text-center bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            ไม่ว่าง
          </button>
        )}

        <Link
          to={`/machines/${machine._id}`}
          className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  )
}

export default MachineCard
