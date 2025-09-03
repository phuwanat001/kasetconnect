const Rental = require("./rental.model");
const Customer = require("../customer/customer.model");
const Product = require("../products/product.model");
const jwt = require("jsonwebtoken");

// ====================== Helper: JWT Auth ======================
const authenticate = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: { status: 401, message: "Unauthorized" } };
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { decoded };
  } catch {
    return { error: { status: 401, message: "Invalid token" } };
  }
};

// ====================== Create Rental ======================
const createRental = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (auth.error) return res.status(auth.error.status).json({ message: auth.error.message });

    const customer = await Customer.findById(auth.decoded.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const {
      products,
      paymentType,
      paidAmount,
      deliveryAddress,
      phone,
      rentalStartDate,
      rentalEndDate,
      returnDate,
    } = req.body;

    if (!products || products.length === 0 || !deliveryAddress || !phone || !rentalStartDate || !rentalEndDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
     // ตรวจสอบและคำนวณราคาสินค้าแต่ละชิ้น
    let totalPrice = 0;
    const productUpdates = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.product}` });
      if (item.quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });
      if (item.quantity > product.stock) return res.status(400).json({ message: `Not enough stock for ${product.name}` });

      totalPrice += product.price * item.quantity;
      productUpdates.push({ product, quantity: item.quantity });
    }
    
    const rental = new Rental({
      customer: customer._id,
      products,
      totalPrice,
      paymentType: paymentType || "full",
      paidAmount: paidAmount ?? (paymentType === "deposit" ? +(totalPrice * 0.25).toFixed(2) : totalPrice),
      paymentSlip: req.file ? `/uploads/${req.file.filename}` : null,
      deliveryAddress,
      phone,
      rentalStartDate,
      rentalEndDate,
      returnDate,
    });

    const savedRental = await rental.save();

    for (const item of productUpdates) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    res.status(201).json({
      message: "Rental created successfully",
      rental: savedRental,
    });
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ message: "Failed to create rental" });
  }
};

// ====================== Get Customer Rentals ======================
const getCustomerRentals = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (auth.error) return res.status(auth.error.status).json({ success: false, message: auth.error.message });

    const customer = await Customer.findById(auth.decoded.id);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

    const rentals = await Rental.find({ customer: customer._id })
      .populate("products.product", "name price category description images")
      .populate("customer", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Customer rentals retrieved successfully",
      totalRentals: rentals.length,
      all_rentals: rentals,
    });
  } catch (error) {
    console.error("Error fetching customer rentals:", error);
    res.status(500).json({ success: false, message: "Failed to fetch customer rentals" });
  }
};

// ====================== Update Rental ======================
const customerUpdateRental = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (auth.error) return res.status(auth.error.status).json({ message: auth.error.message });

    const customer = await Customer.findById(auth.decoded.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const rentalId = req.params.id;
    const {
      products,
      deliveryAddress,
      phone,
      rentalStartDate,
      rentalEndDate,
      returnDate,
    } = req.body;

    const rental = await Rental.findById(rentalId).populate("products.product");
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.customer.toString() !== customer._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to update this rental" });
    }

    if (products && Array.isArray(products)) {
      // คืน stock 
      for (const item of rental.products) {
        item.product.stock += item.quantity;
        await item.product.save();
      }

      // ตรวจสอบ stock ใหม่และคำนวณ totalPrice ใหม่
      let totalPrice = 0;
      const productUpdates = [];
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) return res.status(404).json({ message: `Product not found: ${item.product}` });
        if (item.quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });
        if (item.quantity > product.stock) return res.status(400).json({ message: `Not enough stock for ${product.name}` });

        totalPrice += product.price * item.quantity;
        productUpdates.push({ product, quantity: item.quantity });
      }

      rental.products = products;
      rental.totalPrice = totalPrice;
      if (rental.paymentType === "deposit") {
        rental.paidAmount = +(totalPrice * 0.25).toFixed(2);
      } else {
        rental.paidAmount = totalPrice;
      }

      // ลด stock
      for (const item of productUpdates) {
        item.product.stock -= item.quantity;
        await item.product.save();
      }
    }

    rental.deliveryAddress = deliveryAddress ?? rental.deliveryAddress;
    rental.phone = phone ?? rental.phone;
    rental.rentalStartDate = rentalStartDate ?? rental.rentalStartDate;
    rental.rentalEndDate = rentalEndDate ?? rental.rentalEndDate;
    rental.returnDate = returnDate ?? rental.returnDate;

    if (req.file) {
      rental.paymentSlip = `/uploads/${req.file.filename}`;
    }

    const updatedRental = await rental.save();

    res.status(200).json({
      message: "Rental updated successfully",
      rental: updatedRental,
    });
  } catch (error) {
    console.error("Error updating rental:", error);
    res.status(500).json({ message: "Failed to update rental" });
  }
};

// ====================== Delete Rental ======================
const customerDeleteRental = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (auth.error) return res.status(auth.error.status).json({ message: auth.error.message });

    const customer = await Customer.findById(auth.decoded.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const rentalId = req.params.id;
    const rental = await Rental.findById(rentalId).populate("products.product");
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.customer.toString() !== customer._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this rental" });
    }
    // คืน stock
    for (const item of rental.products) {
      item.product.stock += item.quantity;
      await item.product.save();
    }
    await Rental.findByIdAndDelete(rentalId);

    res.status(200).json({ message: "Rental deleted and stock updated successfully" });
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).json({ message: "Failed to delete rental" });
  }
};

// ====================== Admin / Lessor View All Rentals ======================
const getRentals = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (auth.error) return res.status(auth.error.status).json({ message: auth.error.message });

    // ตรวจสอบ role
    if (!["admin", "lessor"].includes(auth.decoded.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const rentals = await Rental.find()
      .populate("products.product", "name price category")
      .populate("customer", "firstName lastName email phone");

    res.status(200).json({
      message: "Rentals retrieved successfully",
      rentals,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({ message: "Failed to fetch rentals" });
  }
};

module.exports = {
  createRental,
  getCustomerRentals,
  customerUpdateRental,
  customerDeleteRental,
  getRentals,
};
