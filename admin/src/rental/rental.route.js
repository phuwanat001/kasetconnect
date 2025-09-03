const express = require('express');
const Rental = require('./rental.model');
const { createRental, getCustomerRentals, customerUpdateRental, customerDeleteRental, getRentals } = require('./rantal.controller');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
//const upload = require("../middleware/upload");

//Create customer rental end point
//router.post('/create-rental',authMiddleware, createRental, upload.single("paymentSlip"))
router.get('/c',authMiddleware, getCustomerRentals)
//router.put('/update-rental/:id',authMiddleware, customerUpdateRental, upload.single("paymentSlip"))
router.delete('/delete/:id',authMiddleware, customerDeleteRental)

// Lessor and Admin can view all rentals
router.get('/', authMiddleware, getRentals);

module.exports = router