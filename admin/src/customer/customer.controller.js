const Customers = require("./customer.model");

//create customer
const postCustomer = async (req, res) => {
  try {
    const newCustomer = new Customers({ ...req.body });
    await newCustomer.save();
    console.log("Customer created successfully:", newCustomer);
    res.status(200).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

//get all customers
const getCustomer = async (req, res) => {
  try {
    const getCustomer = await Customers.find().sort({ createdAt: -1 });
    res.status(200).send(getCustomer);
  } catch (error) {
    console.error("Error Fetching customer:", error);
    res.status(500).send({ message: "Failed to Fetch customer" });
  }
};

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
      product: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating a Customer :", error);
    res.status(500).send({ message: "Failed to update Customer" });
  }
}

//get single customer by ID
const getSingleCustomer = async (req, res) => {
  try {
    const {id} = req.params;
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
}



module.exports = {
  postCustomer,
  getCustomer,
  updateCustomer,
  getSingleCustomer,

};
