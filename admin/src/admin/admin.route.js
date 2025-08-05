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

//get orders by customer ID
//router.get("/customer/:id/orders",)

//get orders by customer ID and order ID
//router.get("/customer/:id/orders/:id",)

//get rentals by customer ID
//router.get("/customer/:id/rental",)

//get rentals by customer ID and rental ID
//router.get("/customer/:id/rental/:id",)

//get returns by customer ID
//router.get("/customer/:id/return",)

//get returns by customer ID and return ID
//router.get("/customer/:id/return/:id",)

//get receives by customer ID
//router.get("/customer/:id/receives",)

//get receives by customer ID and receive ID
//router.get("/customer/:id/receives/:id",)

//Protected routes Lessor
router.get("/lessors", authMiddleware,getAllLessors );
router.get("/lessor/:id", authMiddleware, getLessorById);
//get all lessor products
//router.post("/lessor/:id/product",authMiddleware, )
//get lessor products by product ID
//router.get("/lessor/:id/product/:id",authMiddleware, )


module.exports = router;