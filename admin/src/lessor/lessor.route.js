const express = require("express");
const router = express.Router();
const Lesssors = require("./lessor.model");
const { postLessor, getLessor, updateLessor, deleteLessor, getSingleLessor } = require("./lessor.controller");
const authMiddleware = require('../middleware/auth.middleware');
//get single lessor by ID
//router.get("/:id",authMiddleware, getSingleLessor);

//update lessor
router.put('/edit/:id',authMiddleware,updateLessor)

//delete lessor
router.delete('/:id',authMiddleware,deleteLessor)


module.exports = router;