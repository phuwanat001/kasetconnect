import React, { useState, useContext } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import '../App.css';
import { FaBell, FaChevronDown } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';


function Navbar({ onSearchClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector(state => state.cart.cartItems);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setDropdownOpen(false);
  };
//search
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
            <li><Link to="/category" className="text-xl text-[var(--primary-text)] hover:text-black" onClick={() => setIsOpen(false)}>หมวดหมู่</Link></li>
            <li><Link to="/contact" className="text-xl text-[var(--primary-text)] hover:text-black" onClick={() => setIsOpen(false)}>ติดต่อเรา</Link></li>
          
          
          </ul>

          {/* เงื่อนไข: ล็อกอินแล้ว (ผู้เช่า) */}
          {currentUser && currentUser.role === 'customer' ? (
            <ul className="flex flex-col md:flex-row gap-y-3 md:gap-x-5 md:ml-10 mt-4 md:mt-0 items-start md:items-center text-[var(--primary-text)]">
              <li>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="relative flex items-center border-2 gap-1 px-4 py-2 bg-[var(--primary-green)] text-white rounded-md shadow hover:bg-[var(--secondary-green)] transition-colors"
                >
                  <FaShoppingBag className="text-lg" />ตะกร้า
                  {
                    cartItems.length > 0 ?  <span className="text-sm font-semibold sm:ml-1">
                    {cartItems.length}</span> :  <span className="text-sm font-semibold sm:ml-1">0</span>
                  }
                </Link>
              </li>
              
              <li className='relative'> 
                  <FaBell className="text-lg cursor-pointer hover:text-black" />
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                      1
                  </span>
              </li>

              <li className='relative'>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='relative inline-flex items-center border-2 gap-1 px-4 py-2 bg-[var(--primary-green)] text-white rounded-md shadow hover:bg-[var(--secondary-green)] transition-colors'
                >
                  สวัสดี, {currentUser.firstName}
                  <FaChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <Link to="/profile" 
                    onClick={() => setDropdownOpen(false)} 
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-300" >ข้อมูลส่วนตัว</Link>

                    <Link to="/rentallist"
                    onClick={() => setDropdownOpen(false)}
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-300'>รายการเช่า</Link>
        
                    <button
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-300">ออกจากระบบ
                    </button>
                  </div>
                )}

              </li>
            </ul>
          ) : (
            // ถ้ายังไม่ล็อกอิน
            <ul className="flex flex-col md:flex-row gap-y-3 md:gap-x-5 md:ml-10 mt-4 md:mt-0 items-start md:items-center">
              <li><Link to="/register" 
                    className="text-xl text-[var(--primary-text)] hover:text-black" 
                    onClick={() => setIsOpen(false)}>สมัครสมาชิก</Link></li>
              <li>
                <Link to="/login"
                  className="text-xl text-white inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[var(--primary-green)] px-4 py-2 hover:bg-[var(--secondary-green)] transition-colors"
                  onClick={() => setIsOpen(false)}>เข้าสู่ระบบ</Link></li>
            </ul>
          )}
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
