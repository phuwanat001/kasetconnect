import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Register = () => {

  const roles = ["เลือกประเภทผู้ใช้งาน", "ผู้เช่า", "ผู้ให้เช่า"];

  const [massage,setMassage] = useState("")

  const { register, 
      handleSubmit, 
      watch, 
      formState: { errors } 
    } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center bg-gray-100'>
        <div className='w-full max-w-4xl mx-auto bg-white shadow-2xl rounded px-10 pt-8 pb-10'>
            <h2 className='text-2xl font-semibold mb-8 flex justify-center py-4'>สมัครสมาชิก</h2>
            

            <form onSubmit={handleSubmit(onSubmit)}>
              {/*Row 1 */}
                <div className='flex gap-9'>
                  <div className='w-1/2'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='username'>ชื่อผู้ใช้งาน</label>
                    <input
                      {...register("username", { required: true })}
                      type='text' id='username' placeholder='Username'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  <div className='w-1/2'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='password'>รหัสผ่าน</label>
                    <input
                      {...register("password", { required: true })}
                      type='password' id='password' placeholder='Password'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                </div>
              
               {/*Row 2 */}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-6'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='fullname'>ชื่อ - นามสกุล</label>
                    <input
                      {...register("fullname", { required: true })}
                      type='text' id='fullname' placeholder='ชื่อ - นามสกุล'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  <div className='w-1/2 mt-6'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='email'>อีเมล</label>
                    <input
                      {...register("email", { required: true })}
                      type='email' id='email' placeholder='อีเมล'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  
                </div>


                 {/*Row 3 */}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-6'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='phone'>เบอร์โทรศัพท์</label>
                    <input
                      {...register("phone", { required: true })}
                      type='text' id='phone' placeholder='เบอร์โทรศัพท์'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  <div className='w-1/2 mt-6'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='address'>ที่อยู่</label>
                    <input
                      {...register("address", { required: true })}
                      type='text' id='address' placeholder='ที่อยู่'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  
                </div>

                   {/*Row 4 */}
                {/*<div className='flex gap-9'>
                  <div className='w-1/2 mt-6'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='idcard'>เลขบัตรประชาชน</label>
                    <input
                      {...register("idcard", { required: true })}
                      type='text' id='idcard' placeholder='เลขบัตรประชาชน'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  <div className='w-1/2 mt-6'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='job'>อาชีพ</label>
                    <input
                      {...register("job", { required: true })}
                      type='text' id='job' placeholder='อาชีพ'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                  </div>
                  
                </div>*/}

                <div className='mt-6'>
                  <label className='block text-gray-700 font-medium mb-2' htmlFor='role'>ประเภทผู้ใช้งาน</label>
                  <select
                    {...register("role", { required: true })}
                    id='role'
                    className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                  >
                    {
                      roles.map((role, index) => (
                        <option key={index} value={role === "เลือกประเภทผู้ใช้งาน" ? "" : role.toLowerCase()}>
                          {role}
                        </option>
                      ))
                    }
                  </select>
                </div>

                {
                    massage && <p className='text-red-500 text-xs italic mb-3'>{massage}</p>
                }

                <div className='flex justify-center mt-6 py-4'>
                    <button type='submit' className='text-xl text-white font-medium w-[400px] px-4 py-2 rounded focus:outline-none bg-[var(--primary-green)] hover:bg-[var(--secondary-green)] transition-colors'>
                      ยืนยัน
                    </button> {/*Link UserPage */}
                </div>
            </form>

            <p className='align-baseline font-medium mt-2 text-sm flex justify-center'>มีบัญชีผู้ใช้แล้ว ?
                <Link to="/login" className='text-blue-500 hover:text-blue-700'> เข้าสู่ระบบ</Link>
            </p>

            <div className='mt-6 flex justify-center'>
                <button className='w-[400px] flex flex-wrap gap-1 items-center justify-center bg-black hover:bg-blue-700
                text-white font-bold py-2 px-4 rounded focus:outline-none'>
                    <FaGoogle className='mr-2'/>Sign in with Google
                </button>
            </div>

            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 KasetConnect. All rights reserved.</p>

        </div>


    </div>
  )
}

export default Register