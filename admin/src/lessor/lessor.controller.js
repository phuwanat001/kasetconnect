const Lessors = require("./lessor.model");

// Create a new lessor
const postLessor = async (req, res) => {
  try {
    const newLossor = new Lessors({ ...req.body });
    await newLossor.save();
    console.log("Lessor created successfully:", newLossor);
    res.status(200).json({
      message: "Lessor created successfully",
      lessor: newLossor,
    });
  } catch (error) {
    console.error("Error creating lessor:", error);
    res.status(500).json({ message: "Failed to create lessor" });
  }
};

//get all lessors
const getLessor = async (req, res) => {
  try {
    const getLessor = await Lessors.find().sort({ createdAt: -1 });
    res.status(200).send(getLessor);
  } catch (error) {
    console.error("Error fetching lessor:", error);
    res.status(500).json({ message: "Failed to fetch lessor" });
  }
};

//Update a lessor
const updateLessor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLessor = await Lessors.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedLessor) {
      res.status(404).send({
        message: "Lessor Not Found !",
      });
    }
    res.status(200).send({
      message: "Lessor updated successfully",
      lessor: updatedLessor,
    });
  } catch (error) {
    console.error("Error updating a lessor :", error);
    res.status(500).send({ message: "Failed to update lessor" });
  }
};

//Delete a lessor
const deleteLessor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLessor = await Lessors.findByIdAndDelete(id);
    if (!deletedLessor) {
      return res.status(404).send({
        message: "Lessor Not Found !",
      });
    }
    res.status(200).send({
      message: "Lessor deleted successfully",
      lessor: deletedLessor,
    });
  } catch (error) {
    console.log("Error deleting lessor:", error);
    res.status(500).send({ message: "Failed to delete lessor" });
  }
};

// Read a single lessor
const getSingleLessor = async (req, res) => {
  try {
    const { id } = req.params;
    const lessor = await Lessors.findById(id);
    if (!lessor) {
      return res.status(404).send({
        message: "Lessor Not Found !",
      });
    }
    res.status(200).send({
      message: "Lessor fetched successfully",
      lessor: lessor,
    });
  } catch (error) {
    console.log("Error fetching lessor:", error);
    res.status(500).send({ message: "Failed to fetch lessor" });
  }
};

module.exports = {
  postLessor,
  getLessor,
  updateLessor,
  deleteLessor,
  getSingleLessor,
};
