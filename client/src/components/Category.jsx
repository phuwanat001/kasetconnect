import React, { useEffect, useState } from 'react'
import MachineCard from '../pages/machines/MachineCard'


const categorys = ["เลือกหมวดหมู่" ,"เครื่องจักรเตรียมดิน", "เครื่องจักรปลูกพืช", "ระบบให้น้ำ/เครื่องจักรชลประทาน", "เครื่องจักรดูแลรักษาพืช", "เครื่องจักรเก็บเกี่ยว", "เครื่องจักรหลังการเก็บเกี่ยว"]

const Category = () =>{
  const[machines, setMachines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");

  useEffect(() =>  {
    fetch("machines.json")
    .then(res => res.json())
    .then((data) => setMachines(data))
  }, [])

  const filteredMachines = selectedCategory === "เลือกหมวดหมู่" ? machines: machines.filter(machine => machine.category === selectedCategory.toLowerCase())
  console.log(filteredMachines)

  return (
    <div className='max-w-6xl mx-auto py-10 px-4'>
        <h1 className="text-3xl font-bold text-center text-[var(--primary-green)] mb-6 p-3">หมวดหมู่เครื่องจักร</h1>

        {/*category */}
        <div className='mb-8 flex items-center'>
          <select onChange={(e) => setSelectedCategory(e.target.value)}
          name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rouned-md px-4 py-2 focus:outline-none'>
            {
              categorys.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))
            }
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {
            filteredMachines.map((machine, index) => (
              <MachineCard key={index} machine={machine}/>
            ))
          }
        </div>

        

    </div>
  )
}

export default Category
