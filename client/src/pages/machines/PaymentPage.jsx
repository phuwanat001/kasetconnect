import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const PaymentPage = () => {
  const { rentalId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // ตัวอย่าง

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rentals/${rentalId}`, {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        });
        setRental(res.data.rental);
      } catch (error) {
        alert("ไม่พบข้อมูลรายการเช่า");
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [rentalId, currentUser]);

  const handlePayment = async () => {
    try {
      // ตัวอย่าง API เรียกจ่ายเงิน (ปรับตาม backend ที่มี)
      const res = await axios.post(
        `http://localhost:5000/api/payments`,
        {
          rentalId,
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );

      if (res.data.success) {
        alert("ชำระเงินสำเร็จ");
        navigate("/thank-you");
      } else {
        alert(res.data.message || "ชำระเงินไม่สำเร็จ");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการชำระเงิน");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <h2>ชำระเงินสำหรับการเช่า</h2>
      {rental ? (
        <>
          <p>สินค้า: {rental.product.name}</p>
          <p>จำนวน: {rental.quantity}</p>
          <p>ราคารวม: ฿{rental.totalPrice}</p>

          <div>
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              ชำระเงินปลายทาง (COD)
            </label>
            {/* ถ้าจะเพิ่มวิธีจ่ายเงินอื่น เช่น บัตรเครดิต ก็เพิ่มที่นี่ */}
          </div>

          <button onClick={handlePayment}>ยืนยันการชำระเงิน</button>
        </>
      ) : (
        <p>ไม่พบข้อมูลรายการเช่า</p>
      )}
    </section>
  );
};

export default PaymentPage;
