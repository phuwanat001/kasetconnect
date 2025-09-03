const Lessors = require("./lessor.model");
const Rental = require("../rental/rental.model");
const Customers = require("../customer/customer.model");
const Product = require("../products/product.model");
const jwt = require("jsonwebtoken");

//Update a lessor
const updateLessor = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const updatedLessor = await Lessors.findByIdAndUpdate(
      decoded.id,
      req.body,
      { new: true }
    );

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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== deletedLessor._id.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can't delete this Lessor" });
    }
    const lessorId = req.params.id;
    const deletedLessor = await Lessors.findByIdAndDelete(lessorId);

    if (!deletedLessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    res.status(200).json({
      message: "Lessor deleted successfully",
      lessor: deletedLessor,
    });
  } catch (error) {
    console.error("Error deleting Lessor:", error);
    res.status(500).json({ message: "Failed to delete lessor" });
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
};

// Lessors can view all rentals

const getRentals = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 1. Decode token (สมมติ authMiddleware แปะ req.user.lessorId ไว้แล้ว)
    const lessorId = await Lessors.findById(decoded.id);

    // 2. หา product ของ lessor
    const products = await Product.find({ createdBy: lessorId }).select("_id");
    const productIds = products.map(p => p._id);

    if (!productIds.length) {
      return res.status(200).json({
        message: "No rentals found",
        totalRentals: 0,
        rentals: [],
      });
    }

    // 3. หา rentals ที่ product อยู่ใน productIds
    const rentals = await Rental.find({ product: { $in: productIds } })
      .populate("customer", "firstName lastName email phone")
      .populate("product", "name price")
      .sort({ createdAt: 1 });

    res.status(200).json({
      message: "Rentals retrieved successfully",
      totalRentals: rentals.length,
      rentals,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({
      message: "Failed to fetch rentals",
      error: error.message,
    });
  }
};




const getProducts = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let products = await Product.find({ createdBy: decoded.id })
      .populate([
        { path: "product_type", select: "name" },
        { path: "createdBy", select: "firstName" },
      ])
      .sort({ createdAt: 1 });

    if (!products.length) {
      return res.status(404).json({ message: "Products not found" });
    }

    products = products.map((p) => {
      const prodObj = p.toObject();
      if (prodObj.stock === 0) prodObj.status = "unavailable";
      if (prodObj.product_type && prodObj.product_type.name) {
        prodObj.product_type = prodObj.product_type.name;
      }
      if (prodObj.createdBy) prodObj.createdBy = prodObj.createdBy.firstName;

      return prodObj;
    });

    res.status(200).json({
      message: "Products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const confirmRental = async (req, res) => {
  try {
    const id = req.params.id;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessor = await Lessors.findById(decoded.id);
    const rental = await Rental.findByIdAndUpdate(id);
    if( !rental === lessor._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You can't confirm this rental" });
    }
    rental.status = "อนุมัติแล้ว";

    await rental.save();
    res.status(200).json({
      message: "Rental confirmed successfully",
      rental,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to confirm rental", error: error.message });
  }
}

module.exports = {
  updateLessor,
  deleteLessor,
  getSingleLessor,
  getRentals,
  getProducts,
  confirmRental,
};
