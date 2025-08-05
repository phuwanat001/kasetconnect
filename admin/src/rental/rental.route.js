const express = require('express');
const Rental = require('./rental.model');
const { createRental } = require('./rantal.controller');
const router = express.Router();

//Create rental end point
router.post('/create-rental', createRental)

module.exports = router