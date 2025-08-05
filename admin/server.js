const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

//import routes
const ProductTypeRoutes = require('./src/product_type/type.route');
const ProductRoutes = require('./src/products/product.route');
const CustomersRoutes = require('./src/customer/customer.route');
const RentalRoutes = require('./src/rental/rental.route');
const LessorRoutes = require('./src/lessor/lessor.route');
const AdminRoutes = require('./src/admin/admin.route');

// routes
app.use('/api/product-types', ProductTypeRoutes)
app.use('/api/products',ProductRoutes)
app.use('/api/customers', CustomersRoutes)
app.use('/api/rental',RentalRoutes)
app.use('/api/lessors',LessorRoutes )
app.use('/api/admin',AdminRoutes )


async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  app.use("/", (req, res) => {
    res.send("KasetConnect Server is running!");
  });
}

main().then(() => console.log("Mongodb connect successfully! ✅")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});