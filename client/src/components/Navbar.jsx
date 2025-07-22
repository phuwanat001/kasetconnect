import React from 'react'
import { useState } from 'react'
function Navbar() {

  return (
    <nav className='max-w-[1500px] bg-green-500 text-white p-5 mx-auto flex flex-row  justify-between rounded-b-lg' >
      <div className="">
        <a href="#">Logo</a>
        <span className='ml-3'>|</span>
      </div>
    <ul className='flex flex-col md:flex-row md:gap-x-10'>
        <li><a href="#">หน้าแรก</a></li>
        <li><a href="#">ค้นหาอุปกรณ์</a></li>
        <li><a href="#">หมวดหมู่</a></li>
        <li><a href="#">ติดต่อเรา</a></li>

    </ul>

    <ul className='flex flex-col md:flex-row md:gap-x-10'>
        <li><a href="#">สมัครสมาชิก</a></li>
        <li><a href="#">เข้าส่ระบบ</a></li>
    </ul>


    </nav>
  )
}

export default Navbar
