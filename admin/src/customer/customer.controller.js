const Customers = require("./customer.model");

//create customer
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      birthdate,
      username,
      password,
    } = req.body;

    // Check if customer already exists by email or username
    const existingCustomer = await Customers.findOne({
      $or: [{ email }, { username }],
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer with this email or username already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new customer
    const newCustomer = new Customers({
      firstName,
      lastName,
      email,
      phone,
      address,
      birthdate,
      username,
      password: hashedPassword,
    });

    // Save customer to database
    const savedCustomer = await newCustomer.save();

    if (!savedCustomer) {
      return res.status(500).json({
        success: false,
        message: "Failed to register customer",
      });
    }
    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Internal server error 500",
    });
  }
};

//Login customer
const loginCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find customer by username
    const customer = await Customers.findOne({ username });
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: customer._id,
        username: customer.username,
      },
      process.env.JWT_SECRET, // Make sure to set this in your .env
      { expiresIn: "1d" } // or '1h', etc.
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        birthdate: customer.birthdate,
        username: customer.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//get all customers
const getCustomer = async (req, res) => {
  try {
    const customers = await Customers.find();
    res.status(200).send(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send({ message: "Failed to fetch customers" });
  }
};

//Update customer by ID
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customers.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCustomer) {
      res.status(404).send({
        message: "Product Not Found !",
      });
    }
    res.status(200).send({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating a Customer :", error);
    res.status(500).send({ message: "Failed to update Customer" });
  }
};

//get single customer by ID
const getSingleCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customers.findById(id);
    if (!customer) {
      res.status(404).send({
        message: "Customer Not Found !",
      });
    }
    res.status(200).send(customer);
  } catch (error) {
    console.error("Error fetching a Customer :", error);
    res.status(500).send({ message: "Failed to fetch Customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await Customers.findByIdAndDelete(id);
    if (!deletedCustomer) {
      console.log("Customer not found", deletedCustomer);
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error,
    });
  }
};

module.exports = {
  postCustomer,
  getCustomer,
  updateCustomer,
  getSingleCustomer,
  deleteCustomer,
  loginCustomer,
};
