import { useEffect, useState } from "react";
import axios from "axios";
import MachineCard from "../pages/machines/MachineCard";

const Category = () => {
  const [producttypes, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTypes();
    fetchProducts();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product-types");
      const data = response.data.producttypes || response.data || [];
      setTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลประเภทอุปกรณ์ได้");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลสินค้าได้");
    }
  };

  const filteredProducts = selectedType
  ? products.filter(product => product.product_type === selectedType)
  : products;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-[var(--primary-green)] mb-6 p-3">
        หมวดหมู่เครื่องจักร
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-8 flex items-center">
        <select
          name="productType"
          id="productType"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
          }}
        >

          <option value="">-- เลือกประเภทเครื่องจักร --</option>
          {producttypes.map((protype) => (
            <option key={protype._id} value={protype._id}>
              {protype.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <MachineCard key={product._id} machine={product} />
          ))
        ) : (
          <p>ไม่มีเครื่องจักรในหมวดหมู่นี้</p>
        )}
      </div>
    </div>
  );
};

export default Category;
