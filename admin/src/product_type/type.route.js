const express = require('express');
const ProductType = require('./type.model');
const { postProductType, getAllProductTypes, deleteProductType, updateProductType } = require('./type.controller');
const router = express.Router();

//crate product type
router.post("/create-product-type",postProductType)

// Get all product types
router.get("/" ,getAllProductTypes)

//Update product type
router.put("/edit/:id",updateProductType); 

// Delete product type
router.delete("/:id",deleteProductType);


module.exports = router;