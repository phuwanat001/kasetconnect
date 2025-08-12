import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getImgUrl } from "../../utils/getImgUrl";

const MachineDetailPage = () => {
  const { id } = useParams(); 
  const [machine, setMachine] = useState(null);
  const [similarMachines, setSimilarMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setMachine(res.data);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลได้");
        setLoading(false);
      }
    };
    fetchMachine();
    
  }, [id]);
  
  if (loading) return <p className="text-center mt-5">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;
  if (!machine) return <p className="text-center mt-5">ไม่พบข้อมูล</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* รายละเอียดหลัก */}
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-6">
        <div className="flex-shrink-0 w-96">
          <img
            src={getImgUrl(machine.coverImage)}
            alt={machine.name}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{machine.name}</h1>
            <p className="text-sm text-gray-500 mb-1">ผู้ให้บริการ Rentconn</p>
            <p className="text-gray-700 whitespace-pre-wrap mb-3">{machine.description}</p>
            <p className="text-gray-700 mb-1"><strong>หมวดหมู่:</strong> {machine.product_type.name}</p>
            <p className="text-gray-700 mb-1"><strong>สถานะ:</strong> {machine.status === "available" ? (
              <span className="text-green-600">ว่าง จำนวน {machine.stock} คัน</span>
            ) : (
              <span className="text-red-600">ไม่ว่าง</span>
            )}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">เพิ่มใส่ตะกร้า</button>
            <button className="flex-grow bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">จอง</button>
          </div>
          <p className="mt-3 p-2 text-sm bg-green-100 rounded text-green-700 max-w-max">
            ว่าง จำนวน {machine.stock} คัน
          </p>
        </div>
      </div>

      {/* เครื่องจักรและอุปกรณ์ที่คล้ายกัน */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">เครื่องจักรและอุปกรณ์ที่คล้ายกัน</h2>
        <div className="flex gap-4 overflow-x-auto">
          {similarMachines.length > 0 ? similarMachines.map((sim) => (
            <div key={sim._id} className="bg-white shadow rounded p-4 w-64 relative">
              <img
                src={getImgUrl(sim.image)}
                alt={sim.name}
                className="w-full h-40 object-contain mb-2 rounded"
              />
              <div className="text-gray-700 text-sm mb-1">
                <strong>{sim.product_type.name}</strong>
              </div>
              <h3 className="font-semibold text-base mb-1">{sim.name}</h3>
              <p className="text-green-700 font-bold mb-1">{sim.price} บาท/วัน</p>
              <p className="text-gray-600 text-sm mb-2">
                สถานะ: {sim.status === "available" ? (
                  <span className="text-green-600">ว่าง / จำนวน {sim.stock} เครื่อง</span>
                ) : (
                  <span className="text-red-600">ไม่ว่าง</span>
                )}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/machines/${sim._id}`}
                  className="flex-grow text-center bg-green-600 text-white py-1 rounded hover:bg-green-700 transition"
                >
                  จองตอนนี้
                </Link>
                <Link
                  to={`/machines/${sim._id}`}
                  className="flex-grow text-center border border-green-600 text-green-600 py-1 rounded hover:bg-green-100 transition"
                >
                  ดูรายละเอียด
                </Link>
              </div>
              <button
                className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-700"
                onClick={() => alert(`เพิ่ม ${sim.name} ลงตะกร้า`)}
              >+</button>
            </div>
          )) : (
            <p className="text-gray-500">ไม่มีเครื่องจักรที่คล้ายกัน</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MachineDetailPage;
