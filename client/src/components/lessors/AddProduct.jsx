import { useEffect, useState } from "react";
import getBaseURL from "../../utils/baseURL";
import { Link } from "react-router-dom";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    status: "available",
    product_type: "",
    image: null,
  });

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${getBaseURL()}/api/product-types`)
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch(() => setTypes([]));
  }, []);

  // แสดง preview รูป
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // validate ข้อมูลเบื้องต้น
    if (
      !form.name ||
      !form.price ||
      !form.description ||
      !form.stock ||
      !form.product_type
    ) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      setLoading(false);
      return;
    }
    if (isNaN(Number(form.price)) || isNaN(Number(form.stock))) {
      setError("ราคาและจำนวนคงเหลือต้องเป็นตัวเลข");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("กรุณาเข้าสู่ระบบก่อน");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("description", form.description);
      formData.append("stock", Number(form.stock));
      formData.append("status", form.status);
      formData.append("product_type", form.product_type);
      if (form.image) formData.append("image", form.image);

      const res = await fetch(`${getBaseURL()}/api/products/create-products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }

      if (!res.ok) {
        setError(data.message || "เพิ่มสินค้าไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setSuccess("เพิ่มสินค้าสำเร็จ!");
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "",
        status: "available",
        product_type: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-3 h-[500px] w-[1600px] bg-gray-100 py-8 px-2 md:px-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">เพิ่มอุปกรณ์</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-3 space-x-3"
      >
        <input
          type="text"
          name="name"
          placeholder="ชื่อสินค้า"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="ราคา"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="รายละเอียดสินค้า"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="จำนวนคงเหลือ"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-50 border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-50 border p-2 rounded"
        >
          <option value="available">พร้อมใช้งาน</option>
          <option value="unavailable">ไม่พร้อมใช้งาน</option>
        </select>
        <select
          name="product_type"
          value={form.product_type}
          onChange={handleChange}
          required
          className="w-50 border p-2 rounded"
        >
          <option value="">--เลือกประเภท--</option>
          {types.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-50 border p-2 rounded"
        />
        {preview && (
          <div className="mb-2">
            <img src={preview} alt="preview" className="max-h-40 rounded" />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "กำลังบันทึก..." : "เพิ่มสินค้า"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
      <Link to="/dashboardl/products">ย้อนกลับ</Link>
    </div>
  );
}

export default AddProduct;
