import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const LessorID = () => {
  const { id } = useParams();
  const [lessor, setLessor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/admin/lessor/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        setLessor(res.data.lessor || res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || "ไม่พบข้อมูลผู้ให้เช่า"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchLessor();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!lessor)
    return (
      <div className="p-8 text-center text-gray-500">ไม่พบข้อมูลผู้ให้เช่า</div>
    );

  return (
    <div className="h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8 ">
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-blue-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6 ">
          {lessor ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                ข้อมูลผู้เช่า
              </h2>
              <div className="h-1 bg-gray-300 mb-5"></div>
              <p className="mb-4">
                {lessor.image ? (
                  <img
                    src={lessor.image}
                    alt={lessor.name}
                    className="w-50 h-50 object-cover  mx-auto mb-4 rounded-lg shadow-md"
                  />
                ) : (
                  <img
                    src={lessor.image}
                    alt={lessor.name}
                    className="w-50 h-50 object-cover  mx-auto mb-4 rounded-lg shadow-md"
                  />
                )}
              </p>
              <div className="flex flex-wrap justify-start gap-x-10 gap-y-5">
                <div className="my-5 ">
                  <h1 className="">รหัส</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{lessor._id}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ชื่อ</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{lessor.firstName} </p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">นามสกุล</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{lessor.lastName}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ชื่อผู้ใช้งาน</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{lessor.username}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">อีเมล</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{lessor.email}</p>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="">ที่อยู่</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <span>
                      {Array.isArray(lessor.address) &&
                      lessor.address.length > 0
                        ? `${lessor.address[0].street || ""} ${
                            lessor.address[0].city || ""
                          } ${lessor.address[0].country || ""} ${
                            lessor.address[0].zipCode || ""
                          }`.trim()
                        : customer.address &&
                          typeof lessor.address === "object"
                        ? `${lessor.address.street || ""} ${
                            lessor.address.city || ""
                          } ${lessor.address.country || ""} ${
                            lessor.address.zipCode || ""
                          }`.trim()
                        : lessor.address}
                    </span>
                  </div>
                </div>
                <div className=" my-5">
                  <h1 className="">เบอร์โทรศัพท์</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{lessor.phone}</p>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="">วันเกิด</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <span>
                      
                      {new Date(lessor.birthdate).toLocaleDateString(
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

export default LessorID;
