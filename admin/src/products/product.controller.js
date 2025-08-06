const Product = require("./product.model");
const Lessors = require("../lessor/lessor.model");
const jwt = require("jsonwebtoken");


//create product
const postProduct = async (req, res) => {
  try {
    // 1. ตรวจสอบว่า header มี token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2. ตรวจสอบ token ว่าถูกต้อง
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    // 3. สร้างสินค้า
    const newProduct = new Product({
      ...req.body,
      createdBy: lessor._id // กำหนดว่าใครเป็นคนสร้าง
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};



// get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetchimg product :", error);
    res.status(500).send({ message: "Failed to fetch product" });
  }
};

//get single product endpoint
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send({
        message: "Product Not Found !",
      });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetchimg product :", error);
    res.status(500).send({ message: "Failed to fetch product" });
  }
};


//update product
const updateProduct = async (req, res) => {
  try {
    // 1. ดึง token จาก header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    // 2. ตรวจสอบว่ามีสินค้านี้อยู่และถูกสร้างโดยคนนี้หรือไม่
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.createdBy.toString() !== lessor._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this product" });
    }

    // 3. อัปเดตสินค้า
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    
    return res.status(500).json({ message: "Failed to update product" });
  }
};


//Delete product
const deleteProduct = async (req, res) => {
  try {
    // 1. ตรวจสอบ token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    // 2. ค้นหาสินค้า
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 3. ตรวจสอบสิทธิ์การลบ
    if (product.createdBy.toString() !== lessor._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this product" });
    }

    // 4. ลบสินค้า
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
};
