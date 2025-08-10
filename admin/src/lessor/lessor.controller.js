
const Lesssors = require("./lessor.model");

// Create a new lessor
const postLessor = async (req, res) => {
  try {
    const newLossor = new Lesssors({ ...req.body });
    await newLossor.save();
    console.log("Lessor created successfully:", newLossor);
    res.status(200).json({
      message: "Lessor created successfully",
      customer: newLossor,
    });
  } catch (error) {
    console.error("Error creating lessor:", error);
    res.status(500).json({ message: "Failed to create lessor" });
  }
};

//get all lessors
const getLessor = async (req, res) => {
  try {
    const getLessor = await Lesssors.find().sort({ createdAt: -1 });
    res.status(200).send(getLessor);
  } catch (error) {
    console.error("Error fetching lessor:", error);
    res.status(500).json({ message: "Failed to fetch lessor" });
  }
};

const Lessors = require("./lessor.model");
const Rental = require("../rental/rental.model");
const Customers = require("../customer/customer.model");
const jwt = require("jsonwebtoken");


//Update a lessor
const updateLessor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLessor = await Lesssors.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedLessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    res.status(200).json({
      message: "Lessor updated successfully",
      lessor: updatedLessor,
    });
  } catch (error) {
    console.error("Error updating Lessor:", error);
    res.status(500).json({ message: "Failed to update lessor" });
  }
};

//Delete a lessor
const deleteLessor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLessor = await Lesssors.findByIdAndDelete(id);
    if (!deletedLessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    res.status(200).json({
      message: "Lessor deleted successfully",
      lessor: deletedLessor,
    });
  } catch (error) {
    console.log("Error deleting lessor:", error);
    res.status(500).send({ message: "Failed to delete lessor" });
  }
};

// Read a single lessor
const getSingleLessor = async (req, res) => {
  try {
    const { id } = req.params;
    const lessor = await Lesssors.findById(id);
    if (!lessor) {
      return res.status(404).send({
        message: "Lessor Not Found !",
      });
    }
    res.status(200).send({
      message: "Lessor fetched successfully",
      lessor: lessor,
    });
  } catch (error) {
    console.log("Error fetching lessor:", error);
    res.status(500).send({ message: "Failed to fetch lessor" });
  }
};

const getSingleLessor = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessorId = req.params.id;
    const lessor = await Lessors.findById(lessorId);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }
    if (decoded.id !== lessor._id.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can't access this Lessor" });
    }
    res.status(200).json({
      message: "Lessor fetching successfully",
      lessor: lessor,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lessor" });
  }
}

// Lessors can view all rentals

const getRentals = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ตรวจสอบว่าเป็น lessor จริงหรือไม่
    const lessor = await Lessors.findById(decoded.id);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }
    
    // ดึงข้อมูล rentals ทั้งหมด - แก้ไข populate
    const rentals = await Rental.find()
      .populate('product', 'name price category description')
      .sort({ createdAt: -1 });
    
    //console.log("Rentals found:", rentals.length); // debug
    
    // ตรวจสอบว่ามี rentals หรือไม่ (ใช้ length แทน !rentals)
    if (rentals.length === 0) {
      return res.status(200).json({ 
        message: "No rentals found",
        totalRentals: 0,
        rentals: []
      });
    }
    
    res.status(200).json({
      message: "Rentals retrieved successfully",
      totalRentals: rentals.length,
      rentals: rentals,
    });
    
  } catch (error) {
    console.error("Error fetching rentals:", error); // debug
    
    // Handle specific errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    res.status(500).json({ 
      message: "Failed to fetch rentals",
      error: error.message 
    });
  }
};


module.exports = {
  updateLessor,
  deleteLessor,
  getSingleLessor,
  getRentals,
};
