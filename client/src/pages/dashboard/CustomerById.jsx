import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CustomerById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/admin/customer/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setCustomer(res.data.customer);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "ไม่พบข้อมูลลูกค้า"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!customer) return null;

  return (
    <div className="h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8 ">
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-blue-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6 ">
          {customer ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                ข้อมูลผู้เช่า
              </h2>
              <div className="h-1 bg-gray-300 mb-5"></div>
              <p className="mb-4">
                {customer.image ? (
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-50 h-50 object-cover  mx-auto mb-4 rounded-lg shadow-md"
                  />
                ) : (
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-50 h-50 object-cover  mx-auto mb-4 rounded-lg shadow-md"
                  />
                )}
              </p>
              <div className="flex flex-wrap justify-start gap-x-10 gap-y-5">
                <div className="my-5 ">
                  <h1 className="">รหัส</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{customer._id}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ชื่อ</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{customer.firstName} </p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">นามสกุล</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{customer.lastName}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ชื่อผู้ใช้งาน</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{customer.username}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">อีเมล</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{customer.email}</p>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="">ที่อยู่</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <span>
                      {Array.isArray(customer.address) &&
                      customer.address.length > 0
                        ? `${customer.address[0].street || ""} ${
                            customer.address[0].city || ""
                          } ${customer.address[0].country || ""} ${
                            customer.address[0].zipCode || ""
                          }`.trim()
                        : customer.address &&
                          typeof customer.address === "object"
                        ? `${customer.address.street || ""} ${
                            customer.address.city || ""
                          } ${customer.address.country || ""} ${
                            customer.address.zipCode || ""
                          }`.trim()
                        : customer.address}
                    </span>
                  </div>
                </div>
                <div className=" my-5">
                  <h1 className="">เบอร์โทรศัพท์</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{customer.phone}</p>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="">วันเกิด</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <span>
                      
                      {new Date(customer.birthdate).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard/customers"
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2  rounded-md text-white"
              >
                กลับไปยังรายการผู้เช่า
              </Link>
            </>
          ) : (
            <p className="text-red-500">ไม่พบข้อมูลผู้เช่า</p>
          )}
        </div>
      )}

    </div>
  );
};

export default CustomerById;
