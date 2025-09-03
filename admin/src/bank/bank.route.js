const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { createBank, readBank, updateBank, readBankByLessor } = require("./bank.controller");

//route public
router.get("/read-bank",readBank)
router.get("/lessor-read-bank",authMiddleware,readBankByLessor)

//lessor create bank

router.post("/create-bank",authMiddleware,createBank)
router.put("/update-bank/:id",authMiddleware,updateBank)

//lessor read bank



module.exports = router;