const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
    credentials: true,
  })
);

// import routes
const ProductTypeRoutes = require("./src/product_type/type.route");
const ProductRoutes = require("./src/products/product.route");
const CustomersRoutes = require("./src/customer/customer.route");
const RentalRoutes = require("./src/rental/rental.route");
const LessorRoutes = require("./src/lessor/lessor.route");
const AdminRoutes = require("./src/admin/admin.route");
const AuthRoutes = require("./src/auth/auth.route");
const BankRoutes = require("./src/bank/bank.route");

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/customers", CustomersRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/rentals", RentalRoutes);
app.use("/api/banks", BankRoutes);
app.use("/api/lessors", LessorRoutes);
app.use("/api/product-types", ProductTypeRoutes);
app.use("/api/admin", AdminRoutes);

app.get("/", (req, res) => {
  res.send("KasetConnect Server is running! ✅");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
    app.listen(port, () => {
      console.log(`Server running on port ${port} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1); // stop server ถ้า DB ต่อไม่ได้
  });
