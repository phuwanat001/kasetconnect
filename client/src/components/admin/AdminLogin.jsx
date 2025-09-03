import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function AdminLogin() {
  const [massage, setMassage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data)
    try {
      //http://localhost:5000/api/admin/login
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        data,{
          header : {
            "Content-Type": "application/json",
          }
        }
      );
      const auth = response.data;
      // console.log(auth)
      if(auth.token){
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert('หมดเวลา กรุณาเข้าสู่ระบบใหม่');
          navigate("/")
        },3600 * 1000); // 1 hour in milliseconds
      }
      toast("Hello World")
      alert('Login successfully!')
      navigate("/dashboard");
    } catch (error) {
      setMassage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4 flex justify-center py-4">
          แอดมินเข้าสู่ระบบ
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              ชื่อผู้ใช้งาน
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3
                    leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              รหัสผ่าน
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3
                    leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {massage && (
            <p className="text-red-500 text-xs italic mb-3">{massage}</p>
          )}

          <div className="flex justify-center mb-4 py-4">
            <button className="text-xl text-white font-medium w-full px-4 py-2 rounded focus:outline-none bg-[var(--primary-green)] hover:bg-[var(--secondary-green)] transition-colors">
              ยืนยัน
            </button>{" "}
            {/*Link UserPage */}
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 KasetConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
