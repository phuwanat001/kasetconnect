const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const { postAdmin, loginAdmin } = require('./admin.controller');
const router = express.Router();

// Public routes (no auth required)
router.post("/register",  postAdmin); 
router.post("/login", loginAdmin);

// Protected routes (auth required)
// router.use(authMiddleware); 

// Protected routes Customer
// router.get("/", authMiddleware, );
// router.get("/:id", authMiddleware, );
// router.put("/edit/:id", authMiddleware, );
// router.delete("/:id", authMiddleware, );


//Protected routes Lessor
// router.get("/lessor", authMiddleware, );
// router.get("/lessor/:id", authMiddleware, );
// router.put("/lessor/edit/:id", authMiddleware, );
// router.delete("/lessor/:id", authMiddleware, );

module.exports = router;