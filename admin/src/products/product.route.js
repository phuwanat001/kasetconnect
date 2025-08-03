const express = require('express');
const { postProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct } = require('./product.controller');
const router = express.Router();

//Post product
router.post("/create-product",postProduct)

//Get all products
router.get("/",getAllProduct)

//Get single Product Endpoint
router.get("/:id",getSingleProduct)

//Put update product Endpoint
router.put("/edit/:id",updateProduct)

//Delete product Endpoint
router.delete("/:id", deleteProduct)


module.exports = router;