import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';
import payment from '../../assets/payment.png';

const RentalPage = () => {
  const { currentUser } = useAuth();
  const reduxCartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMachine = location.state?.machine;
  const [cartItems, setCartItems] = useState([]);

  const [paymentFile, setPaymentFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentType, setPaymentType] = useState("full");
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");

  useEffect(() => {
    if (selectedMachine) {
      setCartItems([{ ...selectedMachine, quantity: 1 }]);
    } else {
      setCartItems(reduxCartItems);
    }
  }, [selectedMachine, reduxCartItems]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const dayCount = rentalStartDate && rentalEndDate
    ? Math.ceil((new Date(rentalEndDate) - new Date(rentalStartDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1) * dayCount, 0);
  const displayPriceNum = paymentType === "deposit" ? totalPrice * 0.25 : totalPrice;
  const tax = displayPriceNum * 0.07;
  const shipping = displayPriceNum * 0.05;
  const finalTotal = displayPriceNum + tax + shipping;

  const onSubmit = async (data) => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
      return;
    }
    if (cartItems.length === 0) {
      alert("ไม่มีสินค้าในตะกร้า");
      return;
    }

    if (!paymentFile) {
      alert("กรุณาแนบสลิปการชำระเงิน");
      return;
    }
    if (!isChecked) {
      alert("กรุณายอมรับเงื่อนไขการเช่า");
      return;
    }

    const formData = new FormData();
    formData.append("customer", currentUser._id);
    formData.append("totalPrice", totalPrice.toFixed(2));
    formData.append("paidAmount",(paymentType === "deposit" ? totalPrice * 0.25 : totalPrice).toFixed(2));
    formData.append("paymentType", paymentType);
    formData.append("phone", data.phone);
    formData.append("rentalStartDate", data.rentalStartDate);
    formData.append("rentalEndDate", data.rentalEndDate);
    formData.append("deliveryAddress", JSON.stringify({
      street: data.street,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode
    }));
    formData.append("products", JSON.stringify(
      cartItems.map(item => ({product: item._id,quantity: item.quantity || 1 }))
    ));
    formData.append("paymentSlip", paymentFile);

    try {
      const res = await axios.post("http://localhost:5000/api/rentals/create-rental", formData, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("การเช่าสำเร็จ");
        navigate("/rentallist");
      } else {
        alert(res.data.message || "เกิดข้อผิดพลาดในการเช่า");
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถทำการเช่าได้ กรุณาลองใหม่");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">เช่าสินค้า</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/*ข้อมูลผู้เช่า */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-6">ข้อมูลผู้เช่า</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">ชื่อ-นามสกุล</label>
                <input
                  {...register("name", { required: "กรุณากรอกชื่อ" })}
                  type="text"
                  defaultValue={`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`}
                  className="mt-1 w-full border rounded-lg px-4 py-2 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">อีเมล</label>
                <input
                  {...register("email", { required: "กรุณากรอกอีเมล" })}
                  type="text"
                  defaultValue={currentUser?.email || ""}
                  className="mt-1 w-full border rounded-lg px-4 py-2 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">เบอร์โทรศัพท์</label>
                <input
                  {...register("phone", { required: "กรุณากรอกเบอร์โทร" })}
                  type="tel"
                  className="mt-1 w-full border rounded-lg px-4 py-2"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              {/* ที่อยู่ */}
              <div>
                <label className="block text-sm font-medium text-gray-600">ที่อยู่</label>
                <input {...register("street", { required: "กรุณากรอกที่อยู่" })} type="text" className="mt-1 w-full border rounded-lg px-4 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">อำเภอ/เขต</label>
                  <input {...register("city", { required: "กรุณากรอกอำเภอ/เขต" })} type="text" className="mt-1 w-full border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">รหัสไปรษณีย์</label>
                  <input {...register("zipCode", { required: "กรุณากรอกรหัสไปรษณีย์" })} type="text" className="mt-1 w-full border rounded-lg px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">จังหวัด</label>
                <input {...register("country", { required: "กรุณากรอกจังหวัด" })} type="text" className="mt-1 w-full border rounded-lg px-4 py-2" />
              </div>

              {/* วันที่เช่า */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">วันที่เริ่มเช่า</label>
                  <input
                    {...register("rentalStartDate", { required: "กรุณาเลือกวันที่เริ่มเช่า" })}
                    type="date"
                    value={rentalStartDate}
                    onChange={(e) => setRentalStartDate(e.currentTarget.value)}
                    className="mt-1 w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">วันที่สิ้นสุดการเช่า</label>
                  <input
                    {...register("rentalEndDate", { required: "กรุณาเลือกวันที่สิ้นสุดการเช่า" })}
                    type="date"
                    value={rentalEndDate}
                    onChange={(e) => setRentalEndDate(e.currentTarget.value)}
                    className="mt-1 w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              {/* เลือกการชำระเงิน */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">เลือกการชำระเงิน</h3>
                <div className="flex items-center mb-2">
                  <input type="radio" name="paymentType" value="deposit" checked={paymentType === "deposit"} onChange={() => setPaymentType("deposit")} className="h-4 w-4 text-green-600" />
                  <label className="ml-2 text-sm">จ่ายมัดจำ 25% ({(totalPrice*0.25).toFixed(2)}฿)</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="paymentType" value="full" checked={paymentType === "full"} onChange={() => setPaymentType("full")} className="h-4 w-4 text-green-600" />
                  <label className="ml-2 text-sm">จ่ายเต็มจำนวน ({totalPrice.toFixed(2)}฿)</label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-4">รายการสินค้าที่เช่า</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">สินค้า</th>
                    <th className="px-4 py-2 text-right">ราคา/วัน (฿)</th>
                    <th className="px-4 py-2 text-right">จำนวน</th>
                    <th className="px-4 py-2 text-right">รวม (฿)</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 text-left">{item.name}</td>
                      <td className="px-4 py-2 text-right whitespace-nowrap">{item.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right whitespace-nowrap">{item.quantity}</td>
                      <td className="px-4 py-2 text-right whitespace-nowrap">{(item.price * item.quantity * dayCount).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="px-4 py-2 text-right font-medium">ยอดชำระ ({paymentType === "deposit" ? "มัดจำ" : "เต็มจำนวน"})</td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">{displayPriceNum.toFixed(2)} ฿</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="px-4 py-2 text-right font-medium">ภาษี 7%</td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">{tax.toFixed(2)} ฿</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="px-4 py-2 text-right font-medium">ค่าจัดส่ง 5%</td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">{shipping.toFixed(2)} ฿</td>
                  </tr>
                  <tr className="font-semibold bg-gray-100 border-t">
                    <td colSpan="3" className="px-4 py-2 text-right">รวมทั้งหมด</td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">{finalTotal.toFixed(2)} ฿</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* QR Code & Upload Slip */}
            <div className='mt-6'>
              <h4 className='font-semibold text-gray-700 mb-2'>ชำระเงิน</h4>
              <p className='text-sm text-gray-500 mb-3'>สแกน QR Code ด้านล่างเพื่อชำระเงิน</p>
              <div className='flex justify-center mb-4'>
                <img src={payment} alt='QR Code' className='w-60 h-60 p-2 rounded-lg shadow'/>
              </div>
              <label className='block mb-2 font-medium text-sm'>แนบหลักฐานการโอนเงิน</label>
              <input
                type='file'
                accept='image/*'
                onChange={e=>setPaymentFile(e.target.files[0])}
                className='w-full border rounded-lg p-2 text-sm'
              />
              {errors.paymentSlip && <p className='text-red-500 text-xs'>{errors.paymentSlip.message}</p>}
            </div>

            {/* Checkbox & Submit */}
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  onChange={(e)=>setIsChecked(e.target.checked)} 
                  className="h-4 w-4 text-blue-600" />
                <label className="ml-2 text-sm text-gray-600">
                  ฉันยอมรับ <Link to="/terms" className="underline text-blue-600">เงื่อนไขการเช่าและข้อตกลงการใช้บริการ</Link> 
                </label>
              </div>
              <button
                type="submit"
                disabled={!isChecked}
                className={`w-full py-3 rounded-lg text-white font-bold transition ${isChecked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"}`}
              >ยืนยันการเช่า
              </button>  
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RentalPage;
