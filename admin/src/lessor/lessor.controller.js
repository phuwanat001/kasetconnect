const Lesssors = require("./lessor.model");

// Create a new lessor
const postLessor = async (req, res) => {
  try {
    const newLossor = new Lesssors({ ...req.body });
    await newLossor.save();
    console.log("Lessor created successfully:", newLossor);
    res.status(200).json({
      message: "Lessor created successfully",
      customer: newLossor,
    });
  } catch (error) {
    console.error("Error creating lessor:", error);
    res.status(500).json({ message: "Failed to create lessor" });
  }
};

//get all lessors
const getLessor = async (req, res) => {
  try {
    const getLessor = await Lesssors.find().sort({ createdAt: -1 });
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
    const updatedLessor = await Lesssors.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
    const { id } = req.params;
    const deletedLessor = await Lesssors.findByIdAndDelete(id);
    if (!deletedLessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    res.status(200).json({
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
    const lessor = await Lesssors.findById(id);
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
  updateLessor,
  deleteLessor,
};
