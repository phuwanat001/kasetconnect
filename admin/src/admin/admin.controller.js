const Admin = require("./admin.model");
const Customers = require("../customer/customer.model");
const Lesssors = require("../lessor/lessor.model");
const Rental = require("../rental/rental.model");
const Deposit = require("../rental/deposit/deposit.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postAdmin = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email or username already exists",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    const saveAdmin = await newAdmin.save();
    if (!saveAdmin) {
      return res.status(500).json({
        success: false,
        message: "Failed to register admin",
      });
    }
    res.status(201).json({
      success: true,
      message: "admin registered successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Internal server error 500",
    });
  }
};

//Login function for admin
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find customer by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET, // Make sure to set this in your .env
      { expiresIn: "1d" } // or '1h', etc.
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Function to get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.find();
    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//Function to get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customers.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Function to get all lessors
const getAllLessors = async (req, res) => {
  try {
    const lessors = await Lesssors.find();
    res.status(200).json({
      success: true,
      lessors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//Function to get lessors by ID
const getLessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const lessor = await Lesssors.findById(id);
    if (!lessor) {
      return res.status(404).json({
        success: false,
        message: "Lessor not found",
      });
    }
    res.status(200).json({
      success: true,
      lessor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Function to get all rentals

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate({
        path: "product",
        select: "name price category createdBy",
        populate: {
          path: "createdBy",
          select: "firstName lastName",
        },
      })
      .populate("customer", "firstName lastName email phone")
      .populate("deposit", "amount status")
      .sort({ createdAt: -1 });

    if (!rentals.length) {
      return res.status(404).json({
        success: false,
        message: "No rentals found",
      });
    }

    res.status(200).json({
      success: true,
      rentals,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Function to get rental by ID
const getRentalById = async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findById(id)
      .populate({
        path: "product",
        select: "name price category createdBy",
        populate: {
          path: "createdBy",
          select: "firstName lastName",
        },
      })
      .populate("customer", "firstName lastName email phone")
      .sort({ createdAt: -1 });
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }
    res.status(200).json({
      success: true,
      rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  postAdmin,
  loginAdmin,
  getAllCustomers,
  getCustomerById,
  getAllLessors,
  getLessorById,
  getAllRentals,
  getRentalById,
};
