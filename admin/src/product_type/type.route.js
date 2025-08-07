const express = require('express');
const ProductType = require('./type.model');
const { postProductType, getAllProductTypes, deleteProductType, updateProductType } = require('./type.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

//crate product type
router.post("/create-product-type",authMiddleware,postProductType)

// Get all product types
router.get("/" ,getAllProductTypes)

//Update product type
router.put("/edit/:id",authMiddleware,updateProductType); 

// Delete product type
router.delete("/:id",authMiddleware,deleteProductType);


module.exports = router;