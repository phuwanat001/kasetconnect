import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductID = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const data =
          response.data.product ||
          response.data.products ||
          response.data ||
          null;
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลสินค้าได้");
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchProduct();
    }, 1000);
  }, [id]);

  return (
    <div className="h-auto w-[1600px] bg-gray-100 py-8 px-2 md:px-8">
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-blue-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
          {product ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">
                รายละเอียดเครื่องจักรและอุปกรณ์
              </h2>
              <div className="h-1 bg-gray-300 mb-5"></div>
              <p className="mb-4" >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100 h-100 object-cover text-center mx-auto mb-4 rounded-lg shadow-md"
                  />
                ) : (
                  "ไม่มีรูปภาพ"
                )}
              </p>
              <div className="flex flex-wrap gap-x-6 ">
                <div className="my-5 ">
                  <h1 className="">รหัส</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{product._id}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ชื่อ</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{product.name}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ประเภทอุปกรณ์</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{product.product_type} </p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ราคา</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{product.price} บาท</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">รายละเอียด</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{product.description}</p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">วันที่เพิ่ม</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">วันที่แก้ไขล่าสุด</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="my-5 ">
                  <h1 className="">ผู้สร้าง</h1>
                  <div className="my-3 bg-gray-200 p-4 rounded-md shadow-md">
                    <p className="">{product.createdBy}</p>
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard/products"
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
              >
                กลับไปยังรายการสินค้า
              </Link>
            </>
          ) : (
            <p className="text-red-500">ไม่พบข้อมูลสินค้านี้</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductID;
