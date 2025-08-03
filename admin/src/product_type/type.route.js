const express = require('express');
const ProductType = require('./type.model');
const { postProductType, getAllProductTypes } = require('./type.controller');
const router = express.Router();

//crate product type
router.post("/create-product-type",postProductType)


// Get all product types
router.get("/" ,getAllProductTypes)



module.exports = router;