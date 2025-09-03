const express = require("express");
const router = express.Router();
const {updateLessor, deleteLessor, getSingleLessor, getRentals, getProducts, confirmRental } = require("./lessor.controller");
const authMiddleware = require('../middleware/auth.middleware');


// Protected products
router.get("/products", authMiddleware ,getProducts)

//manage rental 
router.get("/rentals", authMiddleware, getRentals);
router.get("/rentals/:id", authMiddleware,)
//lessors confirm Rental
router.put("/rentals/:id", authMiddleware,confirmRental)
//manage lessor
//get single lessor by ID
router.get("/:id", authMiddleware, getSingleLessor);

//update lessor
router.put('/edit/:id', authMiddleware, updateLessor);

//delete lessor
router.delete('/:id', authMiddleware, deleteLessor);




module.exports = router;