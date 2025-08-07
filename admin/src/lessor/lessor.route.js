const express = require("express");
const router = express.Router();
const Lessors = require("./lessor.model");
const { postLessor, getLessor, updateLessor, deleteLessor, getSingleLessor } = require("./lessor.controller");


//create lessor
router.post("/create-lessor", postLessor)

//get all lessors
router.get('/',getLessor)

//update lessor
router.put('/edit/:id',updateLessor)

//delete lessor
router.delete('/:id',deleteLessor)

//read single lessor
router.get("/:id",getSingleLessor)


module.exports = router;