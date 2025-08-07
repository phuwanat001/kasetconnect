const Product = require("./product.model");

//create product
const postProduct = async (req, res) => {
  try {
    const newProduct = await Product({ ...req.body });
    await newProduct.save();
    console.log("Product type created successfully:", newProduct);
    res.status(200).json({
      message: "Product type created successfully",
      product_type: newProduct,
    });
  } catch (error) {
    console.error("Error creating product :", error);
    res.status(500).send({ message: "Failed to create product " });
  }
};
// get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetchimg product :", error);
    res.status(500).send({ message: "Failed to fetch product" });
  }
};

//get single product endpoint
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send({
        message: "Product Not Found !",
      });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetchimg product :", error);
    res.status(500).send({ message: "Failed to fetch product" });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).send({
        message: "Product Not Found !",
      });
    }
    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating a product :", error);
    res.status(500).send({ message: "Failed to update product" });
  }
};

//Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product Not Found!" });
    }
    res.status(200).send({
      message: "Product delete successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product :", error);
    res.status(500).send({ message: "Failed to delete product" });
  }
};

module.exports = {
  postProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
