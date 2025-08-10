import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const RentalPage = () => {
  const { currentUser } = useAuth();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
      return;
    }

    if (cartItems.length === 0) {
      alert("ไม่มีสินค้าในตะกร้า");
      return;
    }

    const rentalData = {
      productId: cartItems[0]?._id, // ถ้ารองรับหลายสินค้าต้องปรับ backend
      quantity: cartItems[0]?.quantity || 1,
      deliveryAddress: data.address,
      phone: data.phone,
      rentalStartDate: data.rentalStartDate,
      rentalEndDate: data.rentalEndDate,
      returnDate: null, // สามารถเพิ่มฟิลด์ returnDate ถ้าต้องการ
    };

    try {
      const res = await axios.post("http://localhost:5000/api/rentals", rentalData, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`, 
        },
      });

      if (res.data.success) {
        alert("การเช่าสำเร็จ");
        navigate("/thank-you");
      } else {
        alert(res.data.message || "เกิดข้อผิดพลาดในการเช่า");
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถทำการเช่าได้ กรุณาลองใหม่");
    }
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold text-xl text-gray-600 mb-2">เช่าสินค้า (Cash On Delivery)</h2>
          <p className="text-gray-500 mb-2">ราคารวม: ฿ {totalPrice}</p>
          <p className="text-gray-500 mb-6">จำนวนสินค้า: {cartItems.length}</p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3 my-8">
              <div className="text-gray-600">
                <p className="font-medium text-lg">ข้อมูลส่วนตัว</p>
                <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">

                  <div className="md:col-span-5">
                    <label>ชื่อ-นามสกุล</label>
                    <input
                      {...register("name", { required: "กรุณากรอกชื่อ" })}
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label>อีเมล</label>
                    <input
                      type="text"
                      value={currentUser?.email || ""}
                      disabled
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>เบอร์โทรศัพท์</label>
                    <input
                      {...register("phone", { required: "กรุณากรอกเบอร์โทร" })}
                      type="tel"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label>ที่อยู่จัดส่ง</label>
                    <input
                      {...register("address", { required: "กรุณากรอกที่อยู่" })}
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>วันที่เริ่มเช่า</label>
                    <input
                      {...register("rentalStartDate", { required: "กรุณาเลือกวันที่เริ่มเช่า" })}
                      type="date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.rentalStartDate && <p className="text-red-500 text-xs">{errors.rentalStartDate.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label>วันที่สิ้นสุดการเช่า</label>
                    <input
                      {...register("rentalEndDate", { required: "กรุณาเลือกวันที่สิ้นสุดการเช่า" })}
                      type="date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.rentalEndDate && <p className="text-red-500 text-xs">{errors.rentalEndDate.message}</p>}
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="form-checkbox"
                      />
                      <label className="ml-2">
                        ฉันยอมรับ <Link className="underline text-blue-600">เงื่อนไขการเช่า</Link> และ <Link className="underline text-blue-600">นโยบายการใช้งาน</Link>.
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <button
                      disabled={!isChecked}
                      className={`py-2 px-4 rounded text-white font-bold ${isChecked ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400"}`}
                    >
                      ยืนยันการเช่า
                    </button>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalPage;
