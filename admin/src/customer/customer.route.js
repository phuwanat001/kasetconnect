const express = require('express');
const Customers = require('./customer.model');
const { postCustomer, getCustomer, updateCustomer, getSingleCustomer } = require('./customer.controller');
const router = express.Router();

// Create a new customer
router.post("/create-customer",postCustomer)

// Get all customers
router.get("/", getCustomer)

// Get a customer by ID
//router.get("/:id", )

// Update a customer by ID
/router.put("/edit/:id",updateCustomer)

// Delete a customer by ID
//router.delete("/:id", )

// Update a customer by ID
router.get("/:id",getSingleCustomer)

module.exports = router