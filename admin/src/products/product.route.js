const express = require('express');
const {
  postProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require('./product.controller');

const router = express.Router();
const multer = require('multer');
const path = require('path');

// กำหนด storage ของ multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // เก็บไฟล์ในโฟลเดอร์ uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่กันซ้ำ
  }
});

const upload = multer({ storage });

const authMiddleware = require('../middleware/auth.middleware');

// สร้างสินค้า
router.post("/create-products", authMiddleware, upload.single('image'), postProduct);

// ดึงสินค้าทั้งหมด
router.get("/", getAllProduct);

// ดึงสินค้าตาม ID
router.get("/:id", getSingleProduct);

// อัปเดตสินค้า (รองรับการอัปโหลดภาพใหม่)
router.put("/edit/:id", authMiddleware, upload.single('image'), updateProduct);

// ลบสินค้า
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
