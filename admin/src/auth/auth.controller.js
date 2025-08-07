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
      role = 'customer' // Fixed: Proper default value
    } = req.body;

    // Validate role
    if (!['customer', 'lessor'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'customer' or 'lessor'",
      });
    }

    const existingUser = await Auths.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      birthdate,
      username,
      password: hashedPassword,
      role
    };

    let savedUser;
    let message;

    // Create and save user based on role
    if (role === 'customer') {
      const newCustomer = new Customers(userData);
      savedUser = await newCustomer.save();
      message = "Customer registered successfully";
    } else if (role === 'lessor') {
      const newLessor = new Lessors(userData);
      savedUser = await newLessor.save();
      message = "Lessor registered successfully";
    }

    if (!savedUser) {
      return res.status(500).json({
        success: false,
        message: `Failed to register ${role}`,
      });
    }

    res.status(201).json({
      success: true,
      message,
      user: savedUser,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Customers.findOne({ username }) || await Lessors.findOne({ username });
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
        role: user.role,

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