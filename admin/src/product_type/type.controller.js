const ProductType = require("./type.model");

//create product type
const postProductType = async (req, res) => {
  try {
    const newType = await ProductType({ ...req.body });
    await newType.save();
    console.log("Product type created successfully:", newType);
    res.status(200).json({
      message: "Product type created successfully",
      product_type: newType,
    });
  } catch (error) {
    console.error("Error creating product type:", error);
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


module.exports = {
  postProductType,
  getAllProductTypes,
};
