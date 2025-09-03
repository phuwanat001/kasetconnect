const Rental = require("./rental.model");
const Customer = require("../customer/customer.model");
const Lessor = require("../lessor/lessor.model");
const Deposit = require("./deposit/deposit.model");
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
    if (auth.error) {
      return res.status(auth.error.status).json({ message: auth.error.message });
    }

    const customer = await Customer.findById(auth.decoded.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const {
      productId,
      quantity,
      deliveryAddress,
      phone,
      rentalStartDate,
      rentalEndDate,
      returnDate,
    } = req.body;

    if (!productId || !quantity || !deliveryAddress || !phone || !rentalStartDate || !rentalEndDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate delivery address
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.country || !deliveryAddress.zipCode) {
      return res.status(400).json({ message: "Incomplete delivery address" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });
    if (quantity > product.stock) return res.status(400).json({ message: "Not enough stock" });

    const startDate = new Date(rentalStartDate);
    const endDate = new Date(rentalEndDate);

    if (endDate <= startDate) {
      return res.status(400).json({ message: "Rental end date must be after start date" });
    }

    const totalPrice = quantity * product.price;

    const rental = new Rental({
      customer: customer._id,
      product: product._id,
      quantity,
      totalPrice,
      deliveryAddress,
      phone,
      rentalStartDate: startDate,
      rentalEndDate: endDate,
      returnDate,
    });

    // Create deposit automatically (optional)
    const deposit = new Deposit({
      rental: rental._id,
      status: "รอชำระค่ามัดจำ",
    });
    await deposit.save();

    rental.deposit = deposit._id;
    const savedRental = await rental.save();

    product.stock -= quantity;
    await product.save();

    // populate deposit ก่อนส่งกลับ
    await savedRental.populate("deposit", "status");

    res.status(201).json({
      message: "Rental created successfully",
      rental: savedRental,
    });
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ message: "Failed to create rental", error: error.message });
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
      .populate("product", "name price category description images")
      .populate("customer", "firstName lastName email phone")
      .populate("deposit", " status")
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
      quantity,
      totalPrice,
      deliveryAddress,
      phone,
      rentalStartDate,
      rentalEndDate,
      returnDate,
    } = req.body;

    const rental = await Rental.findById(rentalId).populate("product");
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.customer.toString() !== customer._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to update this rental" });
    }

    if (quantity !== undefined) {
      const diff = quantity - rental.quantity;
      if (diff > 0 && diff > rental.product.stock) {
        return res.status(400).json({ message: "Not enough stock for update" });
      }

      rental.product.stock -= diff;
      rental.quantity = quantity;
      rental.totalPrice = rental.quantity * rental.product.price;

      await rental.product.save();
    } else if (totalPrice !== undefined) {
      rental.totalPrice = totalPrice;
    }

    rental.deliveryAddress = deliveryAddress ?? rental.deliveryAddress;
    rental.phone = phone ?? rental.phone;
    rental.rentalStartDate = rentalStartDate ?? rental.rentalStartDate;
    rental.rentalEndDate = rentalEndDate ?? rental.rentalEndDate;
    rental.returnDate = returnDate ?? rental.returnDate;

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
    const rental = await Rental.findById(rentalId).populate("product");
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.customer.toString() !== customer._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this rental" });
    }

    rental.product.stock += rental.quantity;
    await rental.product.save();
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
      .populate("product", "name price category")
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

const getRentalById = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (auth.error) return res.status(auth.error.status).json({ message: auth.error.message });

    const rentalId = req.params.id;
    const rental = await Rental.findById(rentalId)
      .populate("product", "name price category")
      .populate("customer", "firstName lastName email phone");

    if (!rental) return res.status(404).json({ message: "Rental not found" });

    res.status(200).json({
      message: "Rental retrieved successfully",
      rental,
    });
  } catch (error) {
    console.error("Error fetching rental by ID:", error);
    res.status(500).json({ message: "Failed to fetch rental" });
  }
};

module.exports = {
  createRental,
  getCustomerRentals,
  customerUpdateRental,
  customerDeleteRental,
  getRentals,
  getRentalById,
};
