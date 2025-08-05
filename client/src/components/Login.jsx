import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Login = () => {

    const [massage,setMassage] = useState("")
    const { register, 
        handleSubmit, 
        watch, 
        formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-2xl font-semibold mb-4 flex justify-center py-4'>เข้าสู่ระบบ</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>ชื่อผู้ใช้งาน</label>
                    <input 
                    {...register("username", { required: true })}
                    type='username' name='username' id='username' placeholder='Username'  className='shadow appearance-none border rounded w-full py-2 px-3
                    leading-tight focus:outline-none focus:shadow'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Password'>รหัสผ่าน</label>
                    <input 
                    {...register("password", { required: true })}
                    type='Password' name='Password' id='Password' placeholder='Password'  className='shadow appearance-none border rounded w-full py-2 px-3
                    leading-tight focus:outline-none focus:shadow'/>
                </div>
                {
                    massage && <p className='text-red-500 text-xs italic mb-3'>{massage}</p>
                }

                <div className='flex justify-center mb-4 py-4'>
                    <button className='text-xl text-white font-medium w-full px-4 py-2 rounded focus:outline-none bg-[var(--primary-green)] hover:bg-[var(--secondary-green)] transition-colors'>
                        ยืนยัน</button> {/*Link UserPage */}
                </div>
                
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>ยังไม่มีบัญชีผู้ใช้ ?
                <Link to="/register" className='text-blue-500 hover:text-blue-700'> สมัครสมาชิก</Link>
            </p>

            <div className='mt-4'>
                <button className='w-full flex flex-wrap gap-1 items-center justify-center bg-black hover:bg-blue-700
                text-white font-bold py-2 px-4 rounded focus:outline-none'>
                    <FaGoogle className='mr-2'/>Sign in with Google
                </button>
                
            </div>

            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 KasetConnect. All rights reserved.</p>

        </div>


    </div>
  )
}

export default Login