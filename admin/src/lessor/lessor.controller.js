const Lessors = require("./lessor.model");
const jwt = require("jsonwebtoken");

//Update a lessor
const updateLessor = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const updatedLessor = await Lessors.findByIdAndUpdate(
      decoded.id,
      req.body,
      { new: true }
    );

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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== deletedLessor._id.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can't delete this Lessor" });
    }
    const lessorId = req.params.id;
    const deletedLessor = await Lessors.findByIdAndDelete(lessorId);

    if (!deletedLessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    res.status(200).json({
      message: "Lessor deleted successfully",
      lessor: deletedLessor,
    });
  } catch (error) {
    console.error("Error deleting Lessor:", error);
    res.status(500).json({ message: "Failed to delete lessor" });
  }
};

module.exports = {
  updateLessor,
  deleteLessor,
};
