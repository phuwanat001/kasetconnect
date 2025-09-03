import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardAll = () => {
  const [products, setProducts] = useState([null]);
  const [rentals, setRentals] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("ไม่พบ token กรุณาเข้าสู่ระบบอีกครั้ง");
        setLoading(false);
        return;
      }

      try {
        const [productsRes, rentalsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/lessors/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/lessors/rentals", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const productsData =
          productsRes.data.products || productsRes.data || [];
        const rentalsData = rentalsRes.data.rentals || [];

        setProducts(productsData);
        setRentals(rentalsData);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="ml-3 h-[500px] w-[1600px] bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Dashboards All</h1>
      <div className="flex flex-wrap h-auto  gap-4 p-4 bg-white rounded-lg shadow-md">
        <Link to="/dashboardl/products" className=" bg-blue-500 w-60 text-white p-4 rounded-md ">
          <h1 className="text-xl ">เครื่องจักรและอุปกรณ์</h1>
          <p>{products.length} ชิ้น</p>
        </Link>
        <Link to="/dashboardl/rentals" className="bg-blue-500 w-60 text-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold">การเช่า</h1>
          <p>{rentals.length} รายการ</p>
        </Link>
        <div className="bg-blue-500 w-60  text-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold">การรับ</h1>
          <p> รายการ</p>
        </div>
        <div className="bg-blue-500 w-60 text-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold ">การคืน</h1>
           <p> รายการ</p> 
        </div>
        <div className="bg-blue-500 w-60 text-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold ">รออนุมัติ</h1>
          <p>
            {/* {rentals.filter((rental) => rental.status === "รออนุมัติ").length}{" "} */}
            รายการ
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAll;
