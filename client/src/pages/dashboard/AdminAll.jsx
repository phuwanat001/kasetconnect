import React, { use, useEffect, useState } from "react";
import "./adminall.css";
import axios from "axios";
import { set } from "mongoose";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import LoadingPage from "../loadingPage/LoadingPage";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const AdminAll = () => {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [lessors, setLessors] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        const data = response.data.products || response.data || [];
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลประเภทอุปกรณ์ได้");
      }
    };
    fetchProducts();
    const fetchProductTypes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/product-types"
        );
        const data = response.data.producttypes || response.data || [];
        setProductTypes(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลประเภทอุปกรณ์ได้");
        setLoading(false);
      }
    };
    fetchProductTypes();
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/customers",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setCustomers(response.data.customers || []);
        setLoading(false);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลลูกค้าได้");
        setLoading(false);
      }
    };
    fetchCustomers();
    const fetchLessors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/lessors",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setLessors(response.data.lessors || []);
        setLoading(false);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลผู้ให้เช่าได้");
        setLoading(false);
      }
    };
    fetchLessors();
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/rentals",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setRentals(response.data.rentals || []);
        setLoading(false);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลการเช่าได้");
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);
const data = {
  labels: [
    "อุปกรณ์และเครื่องจักร",
    "ประเภทอุปกรณ์และเครื่องจักร",
    "ผู้เช่า",
    "ผู้ให้เช่า",
    "การเช่า",
  ],
  datasets: [
    {
      label: "จำนวนทั้งหมด",
      data: [
        products.length,
        productTypes.length,
        customers.length,
        lessors.length,
        rentals.length,
      ],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",   // blue
        "rgba(236, 72, 153, 0.8)",   // pink
        "rgba(34, 197, 94, 0.8)",    // green
        "rgba(139, 92, 246, 0.8)",   // purple
        "rgba(239, 68, 68, 0.8)",    // red
      ],
      borderRadius: 8, // มุมโค้งของแท่งกราฟ
      borderSkipped: false, // ให้เป็นสี่เหลี่ยมโค้งทั้งแท่ง
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: { size: 14, weight: "bold" },
        color: "#374151",
      },
    },
    title: {
      display: true,
      text: "📊 สรุปข้อมูล Admin Overview",
      font: { size: 20, weight: "bold" },
      color: "#1f2937",
    },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.8)",
      titleFont: { size: 14, weight: "bold" },
      bodyFont: { size: 13 },
      padding: 10,
      borderColor: "#fff",
      borderWidth: 1,
      callbacks: {
        label: (context) => `${context.raw} รายการ`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 13 }, color: "#4b5563" },
    },
    y: {
      beginAtZero: true,
      grid: { color: "rgba(156,163,175,0.2)" },
      ticks: { stepSize: 1, font: { size: 13 }, color: "#4b5563" },
    },
  },
  animation: {
    duration: 1200,
    easing: "easeOutBounce",
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default") {
        delay = context.dataIndex * 400; // 0.4 วิ ต่อแท่ง
      }
      return delay;
    },
  },
};


  return (
    <div className="h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8">
      <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Admin Overview
        </h2>
        <div className="h-[2px] bg-gray-300 mb-5"></div>
        {loading && (
               <LoadingPage />
        )}
        <div className="mb-6">
          <div className="flex flex-wrap gap-10 text-lg">
            <Link
              to="/dashboard/products"
              className="bg-gray-100 p-4 rounded-lg shadow border-l-10 border-blue-500 shadow-md w-80 autoShow hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-sm ">เครื่องจักรและอุปกรณ์</h3>
              <p className="mt-3 text-end text-2xl">{products.length} ชิ้น</p>
            </Link>
            <Link
              to="/dashboard/product-types"
              className="bg-gray-100 p-4 rounded-lg shadow border-l-10 border-pink-500 shadow-md w-80  autoShow  hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-sm">ประเภทเครื่องจักรและอุปกรณ์</h3>
              <p className="mt-3 text-end text-2xl">
                {productTypes.length} ชิ้น
              </p>
            </Link>
            <Link
              to="/dashboard/customers"
              className="bg-gray-100 p-4 rounded-lg shadow border-l-10 border-green-500 shadow-md w-80 autoShow hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-sm">ผู้เช่า</h3>
              <p className="mt-3 text-end text-2xl">{customers.length} คน</p>
            </Link>
            <Link
              to="/dashboard/lessors"
              className="bg-gray-100 p-4 rounded-lg shadow border-l-10 border-purple-500 shadow-md w-80 autoShow hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-sm">ผู้ให้เช่า</h3>
              <p className="mt-3 text-end text-2xl">{lessors.length} คน</p>
            </Link>
            <Link
              to="/dashboard/rentals"
              className="bg-gray-100 p-4 rounded-lg shadow border-l-10 border-red-500 shadow-md w-80 autoShow hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-sm">การเช่า</h3>
              <p className="mt-3 text-end text-2xl">{rentals.length} รายการ</p>
            </Link>
            <Link
              to="/dashboard/rentals"
              className="bg-gray-100 p-4 rounded-lg shadow border-l-10 border-red-500 shadow-md w-80 autoShow hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-sm">ยอดเงินการเช่า</h3>
              <p className="mt-3 text-end text-2xl">{} รายการ</p>
            </Link>
          </div>
        </div>
        <div className="mb-5">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminAll;
