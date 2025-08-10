import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const Register = () => {

  const roles = [
  { label: "เลือกประเภทผู้ใช้งาน", value: "" },
  { label: "ผู้เช่า", value: "customer" },
  { label: "ผู้ให้เช่า", value: "lessor" }
  ];

  const [message,setMessage] = useState("")
  const navigate = useNavigate();

  const { register,handleSubmit, watch,formState: { errors } } = useForm();
  const { signInWithGoogle} = useAuth();
  const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!") 
            console.error(error)
        }
    }


  const onSubmit = async (data) => {
    if (!data.role){
      setMessage("กรุณาเลือกประเภทผู้ใช้งาน");
      return;
    }

    const endpoint = "http://localhost:5000/api/auth/register";

    const finalData = {
      ...data,
      address: [{
        street: data.street,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode
      }]
    };
      {/*ส่งข้อมูล  */}
    try {
      const response = await axios.post(endpoint, finalData);
      console.log("สมัครสมาชิกสำเร็จ", response.data);
      setMessage("สมัครสมาชิกสำเร็จ");
      navigate("/login");
    } catch (err) {
      console.error("เกิดข้อผิดพลาด", err);
      setMessage("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };


  return (
    <div className='w-full mx-auto flex justify-center items-center bg-gray-100'>
        <div className='w-full max-w-4xl mx-auto bg-white shadow-2xl rounded px-10 pt-8 pb-10'>
            <h2 className='text-3xl font-semibold mb-8 flex justify-center py-4'>สมัครสมาชิก</h2>
            

            <form onSubmit={handleSubmit(onSubmit)}>
                {/*1 */}
                <div className='flex gap-9'>
                  <div className='w-1/2'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='firstName'>ชื่อ</label>
                    <input
                      {...register("firstName", { required: true })}
                      type='text' id='firstName' placeholder='ชื่อ'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.firstName && <p className='text-red-500 text-xs italic'>กรุณากรอกชื่อ</p>}
                  </div>
                  <div className='w-1/2'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='lastName'>นามสกุล</label>
                    <input
                      {...register("lastName", { required: true })}
                      type='text' id='lastName' placeholder='นามสกุล'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.lastName && <p className='text-red-500 text-xs italic'>กรุณากรอกนามสกุล</p>}
                  </div>

                </div>
              {/*2 */}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='phone'>เบอร์โทรศัพท์</label>
                    <input
                      {...register("phone", { required: true })}
                      type='text' id='phone' placeholder='เบอร์โทรศัพท์'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.phone && <p className='text-red-500 text-xs italic'>กรุณากรอกเบอร์โทรศัพท์</p>}
                  </div>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='email'>อีเมล</label>
                    <input
                      {...register("email", { required: true })}
                      type='email' id='email' placeholder='อีเมล'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.email && <p className='text-red-500 text-xs italic'>กรุณากรอกอีเมล</p>}
                  </div>
                  
                </div>

                {/*ที่อยู่ */}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='street'>ที่อยู่ (ถนน)</label>
                    <input
                      {...register("street", { required: true })}
                      type='text' id='street' placeholder='ถนน/บ้านเลขที่'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.street && <p className='text-red-500 text-xs italic'>กรุณากรอกที่อยู่</p>}
                  </div>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='city'>ตำบล/อำเภอ</label>
                    <input
                      {...register("city", { required: true })}
                      type='text' id='city' placeholder='ตำบล/อำเภอ'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.city && <p className='text-red-500 text-xs italic'>กรุณากรอกอำเภอ</p>}
                  </div>
                </div>
                {/*ที่อยู่ */}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='country'>จังหวัด</label>
                    <input
                      {...register("country", { required: true })}
                      type='text' id='country' placeholder='จังหวัด'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.country && <p className='text-red-500 text-xs italic'>กรุณากรอกจังหวัด</p>}
                  </div>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='zipCode'>รหัสไปรษณีย์</label>
                    <input
                      {...register("zipCode", { required: true })}
                      type='text' id='zipCode' placeholder='รหัสไปรษณีย์'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.zipCode && <p className='text-red-500 text-xs italic'>กรุณากรอกรหัสไปรษณีย์</p>}
                  </div>
                </div>
                {/*5*/}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-6'>
                  <label className='block text-gray-700 font-medium mb-2' htmlFor='birthdate'>วันเกิด</label>
                  <input
                    {...register("birthdate", { required: true })}
                    type='date' id='birthdate'
                    className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                  />
                </div>

                <div className='w-1/2 mt-6'>
                  <label className='block text-gray-700 font-medium mb-2' htmlFor='role'>ประเภทผู้ใช้งาน</label>
                  <select
                    {...register("role", { required: true })}
                    id='role'
                    className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                  >
                    {
                      roles.map((role, index) => (
                        <option key={index} value={role.value}>
                          {role.label}
                        </option>
                      ))
                    }
                  </select>
                </div>
                </div>

                {/*Row 6 */}
                <div className='flex gap-9'>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='username'>ชื่อผู้ใช้งาน</label>
                    <input
                      {...register("username", { required: true })}
                      type='text' id='username' placeholder='Username'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.username && <p className='text-red-500 text-xs italic'>กรุณากรอกชื่อผู้ใช้งาน</p>}
                  </div>
                  <div className='w-1/2 mt-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='password'>รหัสผ่าน</label>
                    <input
                      {...register("password", { required: true })}
                      type='password' id='password' placeholder='Password'
                      className='w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring'
                    />
                    {errors.password && <p className='text-red-500 text-xs italic'>กรุณากรอกรหัสผ่าน</p>}
                  </div>
                </div>
                

                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
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
                <button 
                onClick={handleGoogleSignIn}
                className='w-[400px] flex flex-wrap gap-1 items-center justify-center bg-black hover:bg-blue-700
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