import React from 'react'
import farmbureau from '../../assets/farm-bureau.jpg';

function Banner() {
  return (
    <div className="relative w-full h-[400px]">
        <img
            src={farmbureau}
            alt="KasetConnect Banner"
            className="w-full h-full object-cover rounded-b-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h1 className="text-white text-5xl font-extrabold tracking-widest drop-shadow-lg">
            KASET CONNECT
            </h1>
        </div>
    </div>

  )
}

export default Banner