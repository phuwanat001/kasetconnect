import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage";

const Products = () => {
  const [products, setProducts] = useState([]);
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
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลประเภทอุปกรณ์ได้");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-[1500px] bg-gray-100 py-8 px-2 md:px-8">
      <div className="max-w-auto mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          เครื่องจักรและอุปกรณ์
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="overflow-auto ">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 font-semibold">ลำดับ</th>
                
                <th className="px-4 py-2 font-semibold">ชื่อ</th>
                <th className="px-4 py-2 font-semibold">ราคา</th>
                <th className="px-4 py-2 font-semibold">สต๊อก</th>
                <th className="px-4 py-2 font-semibold">สถานะ</th>

                <th className="px-4 py-2 font-semibold">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center ">
                    {loading ? <LoadingPage/> : "ไม่มีข้อมูลสินค้า"}
                  </td>
                </tr>
              ) : (
                products.map((product, i) => (
                  <tr key={product._id}>
                    <td className="border-b px-4 py-4 text-center">{i + 1}</td>  
                    <td className="border-b px-4 py-4">{product.name}</td>
                    <td className="border-b px-4 py-4">{product.price}</td>
                    <td className="border-b px-4 py-4">{product.stock}</td>
                    <td className="border-b px-4 py-4">{product.status}</td>
                    <td className="border-b px-4 py-4">
                      <Link
                        to={`/dashboard/products/${product._id}`}
                        className=" bg-blue-500 hover:bg-blue-700  px-2 py-2 rounded-md text-white text-sm"
                      >
                        เพิ่มเติม
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
