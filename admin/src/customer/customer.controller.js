const Customers = require("./customer.model");

//Update customer by ID
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customers.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCustomer) {
      res.status(404).send({
        message: "Product Not Found !",
      });
    }
    res.status(200).send({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating a Customer :", error);
    res.status(500).send({ message: "Failed to update Customer" });
  }
};

//get single customer by ID
const getSingleCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customers.findById(id);
    if (!customer) {
      res.status(404).send({
        message: "Customer Not Found !",
      });
    }
    res.status(200).send(customer);
  } catch (error) {
    console.error("Error fetching a Customer :", error);
    res.status(500).send({ message: "Failed to fetch Customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await Customers.findByIdAndDelete(id);
    if (!deletedCustomer) {
      console.log("Customer not found", deletedCustomer);
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error,
    });
  }
};

module.exports = {

  updateCustomer,
  getSingleCustomer,
  deleteCustomer,

};
