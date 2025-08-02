import React, { useEffect, useState } from 'react'
import machine1 from '../assets/machines/machines-1.jpg'
import machine2 from '../assets/machines/machines-2.jpg'
import machine3 from '../assets/machines/machines-3.png'
import machine4 from '../assets/machines/machines-4.png'
import machine5 from '../assets/machines/machines-5.jpg'
import machine6 from '../assets/machines/machines-6.png'
import machine7 from '../assets/machines/machines-7.jpg'
import machine8 from '../assets/machines/machines-8.png'
import machine9 from '../assets/machines/machines-9.jpg'
import MachineCard from '../pages/machines/MachineCard'


const images = {
  'machines-1.jpg' : machine1,'machines-2.jpg' : machine2,'machines-3.png' : machine3,'machines-4.png' : machine4,'machines-5.jpg' : machine5,
  'machines-6.png' : machine6,'machines-7.jpg' : machine7,'machines-8.png' : machine8,'machines-9.jpg' : machine9,
}

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
        <h1 className="text-3xl font-bold text-center text-[var(--primary-green)] mb-6">หมวดหมู่เครื่องจักร</h1>
        <h2 className='text-3 font-semibold md-6'>เครื่องจักรและอุปกรณ์ที่นิยม</h2>
        
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

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
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
