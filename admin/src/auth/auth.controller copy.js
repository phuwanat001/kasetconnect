const Auths = require("./auth.model");
const Customers = require("../customer/customer.model");
const Lessors = require("../lessor/lessor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postUser = async (req, res) => {
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
      role = 'customer' || 'lessor' // Default role
      
    } = req.body;

    const existingCustomer = await Auths.findOne({
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

    // Create new user - Fix: Use Auths instead of Customers
    const newCustomer = new Customers({
      firstName,
      lastName,
      email,
      phone,
      address,
      birthdate,
      username,
      password: hashedPassword,
      role : role // Default role
    });
      const newLessor = new Lessors({
      firstName,
      lastName,
      email,
      phone,
      address,
      birthdate,
      username,
      password: hashedPassword,
      role : role // Default role
    });
    console.log("New Customer:", newCustomer);
    console.log("New Lessor:", newLessor);
    // Save user to database
    const savedUser = await newCustomer.save();

    // if (!savedUser) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Failed to register user",
    //   });
    // }
    // res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   user: newUser,
    // });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Internal server error 500",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username - Fix: Use Auths instead of Customers
    const user = await Auths.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthdate: user.birthdate,
        username: user.username,

      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  postUser,
  loginUser,
};