import axios from "axios";
import { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNumbank, setEditNumbank] = useState("");
  const [editTypebank, setEditTypebank] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
        setLoading(false);
        return;
      }
      try {
        setError("");
        const response = await axios.get(
          "http://localhost:5000/api/banks/lessor-read-bank",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const paymentsData = response.data.banks || [];

        setPayments(paymentsData);
      } catch (error) {
        console.log(error);
        setError("ไม่สามารถดึงข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);
  const editBank = (id, name, numbank, typebank) => {
    setEditId(id);
    setEditName(name);
    setEditNumbank(numbank);
    setEditTypebank(typebank);
  };
  const saveEdit = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("กรุณาเข้าสู่ระบบก่อนแก้ไขข้อมูล");
          return;
        }
        const response = await axios.put(
          `http://localhost:5000/api/banks/update-bank/${id}`,
          { name: editName, accountNumber: editNumbank, bankName: editTypebank },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          await fetchPayments();
          setEditId(null);
          setEditName("");
          setEditNumbank("");
          setEditTypebank("");
          alert("แก้ไขข้อมูลธนาคารเรียบร้อยแล้ว");
        }
    } catch (error) {
        alert("ไม่สามารถแก้ไขข้อมูลธนาคารได้");
    }
  }

  return (
    <div className="ml-3 h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Payments</h1>

      {loading ? (
        <p className="text-center text-lg mt-10">⏳ กำลังโหลด...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : payments.length === 0 ? (
        <p className="text-center">ไม่พบข้อมูลการชำระเงิน</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
            >
              {payment.image ? (
                <img
                  src={payment.image}
                  alt={payment.bankName}
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-md mb-2 flex items-center justify-center text-gray-600">
                  ไม่มีรูป
                </div>
              )}
              <div className="flex flex-col gap-4 justify-center items-center w-full my-2 p-5">
                <input type="text" placeholder={`${payment.bankName}`} className="w-full text-center focus:border-3 bg-blue-200 h-10 rounded-md"/>
                <input type="text" placeholder={`${payment.accountNumber}`} className="w-full text-center" />
                <input type="text" placeholder={`${payment.name}`} className="w-full text-center"/>

                <button
                  onClick={editBank}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 hover:underline cursor-pointer"
                >
                  แก้ไข
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
