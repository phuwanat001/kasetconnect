import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SelectPtype = ({ value, onChange }) => {
  const [producttypes, setTypes] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product-types"
        );
        const data = response.data.producttypes || response.data || [];
        setTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลประเภทอุปกรณ์ได้");
      }
    };
    fetchTypes();
  }, []);


  return (
    <div className="">
      <select
        className="w-full p-2 border border-gray-300 rounded-md"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">เลือกประเภทสินค้า</option>
        {producttypes.map((type) => (
          <option key={type._id} value={type._id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPtype;
