const express = require('express');
const { updateCustomer, getSingleCustomer, deleteCustomer,} = require('./customer.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.use(authMiddleware); 

// Protected routes
// router.get("/", authMiddleware, getCustomer);
//Get customer by ID
router.get("/:id", authMiddleware, getSingleCustomer);
router.put("/edit/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);


module.exports = router;