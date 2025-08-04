import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar({ onSearchClick }) {
  const [isOpen, setIsOpen] = useState(false);

  {/*กดค้นหาแล้วเลื่อนลงไป */}
  const navigate = useNavigate();

  const handleScrollToSearch = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('search-box');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const el = document.getElementById('search-box');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // ปิดเมนูมือถือถ้าเปิดอยู่
  };

  return (
    <nav className="bg-white shadow-md w-full relative z-50">
      <div className="max-w-[1500px] mx-auto p-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-[var(--primary-green)]">Kaset</span>
          <span className="text-2xl font-bold">Connect</span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--primary-text)] focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:gap-x-10 gap-y-4 md:gap-y-0 absolute md:static top-[80px] left-0 w-full md:w-auto bg-white md:bg-transparent px-5 py-4 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'flex' : 'hidden md:flex'
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-y-4 md:gap-x-10 items-start md:items-center">
            <li><Link to="/" className="text-xl text-[var(--primary-text)] hover:text-black" onClick={() => setIsOpen(false)}>หน้าแรก</Link></li>
            <li><button onClick={handleScrollToSearch} className="text-xl text-[var(--primary-text)] hover:text-black">ค้นหาอุปกรณ์</button></li>
            <li><Link to="/category" className="text-xl text-[var(--primary-text)] hover:text-black"onClick={() => setIsOpen(false)}>หมวดหมู่</Link></li>
            <li><Link to="/contact" className="text-xl text-[var(--primary-text)] hover:text-black"onClick={() => setIsOpen(false)}>ติดต่อเรา</Link></li>
          </ul>
          <ul className="flex flex-col md:flex-row gap-y-3 md:gap-x-5 md:ml-10 mt-4 md:mt-0 items-start md:items-center">
            <li><Link to="/register" className="text-xl text-[var(--primary-text)] hover:text-black" onClick={() => setIsOpen(false)}>สมัครสมาชิก</Link></li>
            <li>
              <Link to="/login"
                className="text-xl text-white inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[var(--primary-green)] px-4 py-2 hover:bg-[var(--secondary-green)] transition-colors"
                onClick={() => setIsOpen(false)}>เข้าสู่ระบบ</Link></li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
