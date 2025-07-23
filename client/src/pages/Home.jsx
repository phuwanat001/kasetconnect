import React from 'react';
import { Link } from 'react-router-dom';
import farmbureau from '../assets/farm-bureau.jpg';

function Home() {
  return (
    <div className='flex flex-col min-h-screen'>

      <div className='w-full'> 
        <img
          src= {farmbureau} alt="KasetConnect Banner"
          className="w-full h-[500px] object-cover rounded-md-2xl shadow-md"/>
      </div>
      <div className="text-center py-10 px-4 bg-[var(--bg-light)] flex-grow">
        <h1 className="text-4xl font-bold text-[var(--primary-green)] mb-6">
          ยินดีต้อนรับสู่ KasetConnect
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          แพลตฟอร์มเช่าเครื่องจักรเกษตรที่สะดวก รวดเร็ว และปลอดภัย
        </p>
        <Link to="/category">
          <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-xl text-lg shadow hover:scale-105 transition">
            ดูหมวดหมู่เครื่องจักร
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
