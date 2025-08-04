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

//Delete product type
const deleteProductType = async (req,res) =>{
  try {
    const { id } = req.params;
    const deletedType = await ProductType.findByIdAndDelete(id);
    if (!deletedType) {
      return res.status(404).json({ message: "Product type not found" });
    }
    console.log("Product type deleted successfully:", deletedType);
    res.status(200).json({
      message: "Product type deleted successfully",
      product_type: deletedType,
    });
  } catch (error) {
    console.error("Error deleting product type:", error);
    res.status(500).json({ message: "Failed to delete product type" });
  }
}

//Update product type
const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductType = await ProductType.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProductType) {
      res.status(404).send({
        message: "Product-Type Not Found !",
      });
    }
    res.status(200).send({
      message: "Product-Type updated successfully",
      product: updatedProductType,
    });
  } catch (error) {
    console.error("Error updating a product-type :", error);
    res.status(500).send({ message: "Failed to update-type product" });
  }
};



module.exports = {
  postProductType,
  getAllProductTypes,
  deleteProductType,
  updateProductType,
};
