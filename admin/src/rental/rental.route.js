const express = require('express');
const Rental = require('./rental.model');
const { createRental, getCustomerRentals, customerUpdateRental, customerDeleteRental, getRentals, getRentalById } = require('./rantal.controller');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

//Create customer rental end point
router.post('/create-rental',authMiddleware, createRental)
router.get('/c',authMiddleware, getCustomerRentals)
router.put('/update-rental/:id',authMiddleware, customerUpdateRental)
router.delete('/delete/:id',authMiddleware, customerDeleteRental)

// Lessor and Admin can view all rentals
// router.get('/', authMiddleware, getRentals);
// router.get('/rental/:id', authMiddleware,getRentalById);

module.exports = router