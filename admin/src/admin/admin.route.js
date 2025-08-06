const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const { postAdmin, loginAdmin, getAllCustomers, getCustomerById, getAllLessors, getLessorById } = require('./admin.controller');
const router = express.Router();

// Public routes (no auth required)
router.post("/register",  postAdmin); 
router.post("/login", loginAdmin);

// Protected routes (auth required)
router.use(authMiddleware); 

// Protected routes Customer
router.get("/customers", authMiddleware, getAllCustomers);
router.get("/customer/:id", authMiddleware, getCustomerById);

// Protected routes lessor
router.get("/lessors", authMiddleware, getAllLessors);
router.get("/lessor/:id", authMiddleware, getLessorById);




module.exports = router;