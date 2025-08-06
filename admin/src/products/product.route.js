const express = require('express');
const { postProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct } = require('./product.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

//Post product
router.post("/create-products",authMiddleware,postProduct)

//Get all products
router.get("/",getAllProduct)

//Get single Product Endpoint
router.get("/:id",getSingleProduct)

//Put update product Endpoint
router.put("/edit/:id",authMiddleware,updateProduct)

//Delete product Endpoint
router.delete("/:id",authMiddleware, deleteProduct)


module.exports = router;