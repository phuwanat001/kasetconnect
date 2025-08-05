const express = require('express');
const { postCustomer, getCustomer, updateCustomer, getSingleCustomer, deleteCustomer, loginCustomer } = require('./customer.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// Public routes (no auth required)
router.post("/register", postCustomer); 
router.post("/login", loginCustomer);

// Protected routes (auth required)
router.use(authMiddleware); 

// Protected routes
// router.get("/", authMiddleware, getCustomer);
router.get("/:id", authMiddleware, getSingleCustomer);
router.put("/edit/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);

//get rentals by customer ID
// router.get("/:id/rentals", authMiddleware, getOrdersByCustomerId);

module.exports = router;