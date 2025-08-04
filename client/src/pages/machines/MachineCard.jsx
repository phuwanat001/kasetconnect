import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'

const MachineCard = ({ machine }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <div className="flex justify-end mb-2">
        <button className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-blue-600">
          +
        </button>
      </div>

        <div className="flex justify-center">
          <img
            src={getImgUrl(machine.coverImage)}
            alt={machine.name}
            className="w-40 h-40 object-contain mb-4 "
          />
        </div>

      <p className="text-sm text-gray-400">{machine.category}</p>

      <Link  to={`/machines/${machine.id}`}>
        <h2 className="text-xl font-semibold mb-2">{machine.name}</h2>
      </Link>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-800 mb-2">
        <div>
          <span className="font-medium">{machine.rental_price} บาท</span> / วัน
        </div>
        <div className="font-medium">ความพึงพอใจ</div>

        <div>
          สถานะว่าง : จำนวน {machine.quantity_available} คัน
        </div>
        <div className="flex items-center">
          {/* mock ดาว 4 เต็ม 5 */}
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
          <FaStar className="text-gray-300" />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">จองตอนนี้ </button>

        <Link
          to={`/machines/${machine._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">ดูรายละเอียด
        </Link>
      </div>
    </div>          
        
  )
}

export default MachineCard
