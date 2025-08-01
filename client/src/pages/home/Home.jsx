import Banner from '../home/Banner';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


function Home() {
  const location = useLocation();

  useEffect(() => {
    if(location.hash == '#search-box'){
      const el = document.getElementById('search-box');
      if(el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [location]);

  return (
    <>
      <Banner/>
      <div className='flex items-center justify-center md:px-16 py-10'>
        <h1 className='md:text-3xl font-bold drop-shadow-lg'>ทำไมต้องเช่าเครื่องจักรและอุปกรณ์กับ</h1>
        <h1 className='md:text-4xl font-bold px-2 text-[var(--primary-green)] drop-shadow-lg'> Kaset Connect</h1>
      </div>
      <div>
        <p className='max-w-7xl mx-auto px-6 text-lg mb-15'>การลงทุนซื้อเครื่องจักรสำหรับการใช้งานเพียงครั้งเดียวย่อมมีค่าใช้จ่ายที่สูงและอาจไม่คุ้มค่าในการใช้งานระยะยาว 
          แต่การเช่าเครื่องจักรกับระบบของเราช่วยให้คุณสามารถดำเนินงานภายใต้บรรยากาศที่ต้องการในงบประมาณที่ควบคุมได้ 
          และยังสามารถหลีกเลี่ยงค่าใช้จ่ายเพิ่มเติมที่เกิดจากการบำรุงรักษาหรือการจัดเก็บ การเช่าเครื่องจักรยังช่วยลดภาระในการดูแลรักษาเมื่อเสร็จสิ้นการใช้งาน 
          คุณสามารถมุ่งเน้นไปที่การเพิ่มประสิทธิภาพในงานของคุณได้มากขึ้น โดยไม่ต้องกังวลเกี่ยวกับการดูแลเครื่องจักรที่อาจเสียหายหรือเสื่อมสภาพ
        </p>
      </div>
      <h1 className='max-w-5xl text-2xl font-medium md:flex justify-center p-3'>ค้นหาเครื่องจักรแและอุปกรณ์</h1>
      
      <div id="search-box" className="flex items-center justify-center p-5 bg-white">
        <div className='relative w-full max-w-xl'>
          <FaSearch className="absolute inset-y-3 left-3 flex items-center text-gray-400 "/>
        <input type="text" placeholder="ค้นหา..." className="w-full border pl-10 pr-4 py-2 rounded-md shadow-sm"/>
        </div>
        
        <button className='ml-3 text-xl text-white inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[var(--primary-green)] px-4 py-2 hover:bg-[var(--secondary-green)] transition-colors'>
          ค้นหา
        </button>
        
      </div>   

      {/*<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <MachineCard />
          
        </div>*/}
         
    </>
  );
}

export default Home;
