const Product = require("./product.model");
const Lessors = require("../lessor/lessor.model");
const ProductType = require("../product_type/type.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//create product
const postProduct = async (req, res) => {
  try {
    // name, price, description, stock, status, product_type อยู่ใน req.body
    const { name, price, description, stock, status, product_type } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) return res.status(404).json({ message: "Lessor not found" });

    // รับ path รูปจาก multer
    let image = "";
    if (req.file) {
      image = req.file.path; // หรือ req.file.filename ถ้าต้องการแค่ชื่อไฟล์
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      status,
      product_type,
      image,
      createdBy: lessor._id ,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// get all products
const getAllProduct = async (req, res) => {
  try {
    let products = await Product.find()
      .populate([
        { path: "product_type", select: "name" },
        { path: "createdBy", select: "firstName" },
      ])
      .sort({ createdAt: 1 });

    // แปลง status ถ้า stock = 0
    products = products.map((product) => {
      const prodObj = product.toObject();
      if (prodObj.stock === 0) prodObj.status = "unavailable";

      // แปลง product_type เป็นชื่อ
      if (prodObj.product_type) prodObj.product_type = prodObj.product_type.name;

      // แปลง createdBy เป็นชื่อผู้ให้เช่า
      if (prodObj.createdBy) prodObj.createdBy = prodObj.createdBy.firstName;

      return prodObj;
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};



//get single product endpoint
const getSingleProduct = async (req, res) => {
  try {
    // ตรวจสอบ ObjectId ก่อน
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // ดึงสินค้าและ populate product_type (เฉพาะชื่อ)
    const product = await Product.findById(req.params.id).populate("product_type", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // แปลงเป็น object ปรับ status และ product_type
    const prodObj = product.toObject();
    if (prodObj.stock === 0) prodObj.status = "unavailable";
    if (prodObj.product_type) prodObj.product_type = prodObj.product_type.name;
    // แปลง createdBy เป็นชื่อผู้ให้เช่า
    if (prodObj.createdBy) {
      const lessor = await Lessors.findById(prodObj.createdBy, "firstName");
      if (lessor) {
        prodObj.createdBy = lessor.firstName;
      } else {
        prodObj.createdBy = "Unknown Lessor";
      }
    }
    

    // ส่ง response สะอาด
    return res.json({ product: prodObj });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


//update product
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products"); // โฟลเดอร์เก็บรูป
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

const updateProduct = async (req, res) => {
  try {
    // 1. ตรวจสอบ token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    // 2. ตรวจสอบว่าสินค้านี้มีอยู่จริงและเป็นของคนนี้
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.createdBy.toString() !== lessor._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    // 3. สร้าง object อัปเดต
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      status: req.body.status,
      product_type: req.body.product_type,
    };

    // ถ้ามีไฟล์ใหม่ให้ลบไฟล์เก่า
    if (req.file) {
      if (existingProduct.image) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          "products",
          existingProduct.image
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.image = req.file.filename;
    }

    // 4. อัปเดตสินค้า
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update product" });
  }
};

//Delete product
const deleteProduct = async (req, res) => {
  try {
    // 1. ตรวจสอบ token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. หาข้อมูลผู้ให้เช่า (lessor)
    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    // 3. หาสินค้า
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 4. ตรวจสอบสิทธิ์การลบ
    if (product.createdBy.toString() !== lessor._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product" });
    }

    // 5. ลบสินค้า
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  postProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  upload,
};
