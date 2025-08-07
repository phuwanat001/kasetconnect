const ProductType = require("./type.model");
const jwt = require("jsonwebtoken");
const Admin = require("../admin/admin.model");

//create product type
const postProductType = async (req, res) => {
  try {
    //check header for token
    const authHeader = req.headers.authorization;
    // Check if the token is present and starts with "Bearer "
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    //แบ่ง string authHeader ออกเป็น array โดยใช้ " " (ช่องว่าง) เป็นตัวแบ่ง
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Create a new product type
    const newProductType = new ProductType({
      ...req.body,
      createdBy: admin._id // Set the creator of the product type
    });
    await newProductType.save();
    res.status(201).json({
      message: "Product type created successfully",
      product_type: newProductType
    });


  } catch (error) {
    console.error("Error creating product type:", error.message);
    res.status(500).json({ message: "Failed to create product type" });
  }
};

//get all product types

const getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).send(productTypes);
  } catch (error) {
    console.error("Error fetchimg product type:", error);
    res.status(500).json({ message: "Failed to fetch product type" });
  }
};

//Delete product type
const deleteProductType = async (req,res) =>{
 try {
    // Check if the request has an authorization header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //find admin 
    const admin = await Admin.findById(decoded.id)
    //check admin
    if(!admin){
      return res.status(404).json({message : "Admin not found"});
    }
    
    //delete product type
    const deletedProductType = await ProductType.findByIdAndDelete(req.params.id);
    
    if (!deletedProductType) {
      return res.status(404).json({ message: "Product type not found" });
    }

    return res.status(200).json({
      message: "Product type deleted successfully",
      product_type: deletedProductType
    });

  } catch (error) {
    console.error("Error deleting product type:", error.message);
    return res.status(500).json({ message: "Failed to delete product type" });
  }
}

//Update product type
const updateProductType = async (req, res) => {
  try {
    // Check if the request has an authorization header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //find admin 
    const admin = await Admin.findById(decoded.id)
    //check admin
    if(!admin){
      console.log("Admin not found");
      return res.status(404).json({message : "Admin not found"});
    }
    //update
    const updateProductType = await ProductType.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    )
    console.log("Product type updated successfully");
    return res.status(200).json({
      message : "Product Type updated successfully",
      product_type : updateProductType
    });
  } catch (error) {
    console.error("Error updating product type:", error.message);
    return res.status(500).json({message : "Failed to update product_type"})
  }
};




module.exports = {
  postProductType,
  getAllProductTypes,
  deleteProductType,
  updateProductType,
};
