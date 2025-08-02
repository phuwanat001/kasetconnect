import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'

const MachineCard = ({ machine }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col h-full">
      <Link to={`/machines/${machine.id}`}>
        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={`${getImgUrl(machine?.coverImage)}`}
            alt={machine.name}
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-grow">
        <Link to={`/machines/${machine.id}`}>
          <h3 className="text-xl font-semibold hover:text-blue-600 mb-2">
            {machine.name}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 flex-grow">{/* machine.description */}</p>

        <p className="font-medium text-lg text-green-700 mb-4">฿{machine.rental_price}</p>

        <button className="btn-primary px-6 py-2 flex items-center justify-center gap-2 mt-auto">
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default MachineCard


{/*<div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-400">{machine.category}</span>
                        <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold">+</button>
                    </div>

                    <h2 className="text-xl font-semibold mt-4">{machine.name}</h2>

                    <div className="flex justify-between text-gray-700 mt-2">
                        <p>{machine.price} บาท / วัน</p>
                        <p>ความพึงพอใจ</p>
                    </div>

                    <div className="flex justify-between text-sm mt-1">
                        <p className="text-gray-500">สถานะว่าง / จำนวน {machine.quantity} คัน</p>
                        <p className="text-yellow-500">★ ★ ★ ★ ☆</p>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                        จองตอนนี้
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        ดูรายละเอียด
                        </button>
                    </div>*/}