const Lessors = require("../lessor/lessor.model");
const Bank = require("./bank.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createBank = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessorId = decoded.id;
    const lessor = await Lessors.findById(lessorId);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }
    const { name, accountNumber, bankName, image } = req.body;
    const newBank = new Bank({
      name,
      accountNumber,
      bankName,
      image,
      lessor: lessorId,
    });
    await newBank.save();
    res
      .status(201)
      .json({ message: "Bank created successfully", bank: newBank });
  } catch (error) {
    res.status(500).json({ message: "Failed to create bank" });
  }
};

const readBank = async (req, res) => {
  try {
    const banks = await Bank.find().populate("lessor", "name email");
    res.status(200).json({ banks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch banks" });
  }
};

const updateBank = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessorId = decoded.id;

    const lessor = await Lessors.findById(lessorId);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }

    const bankId = req.params.id;
    const { name, accountNumber, bankName, image } = req.body;

    // ดึง Bank มาก่อนเพื่อเช็คว่าเป็นของ Lessor นี้ไหม
    const bank = await Bank.findById(bankId);
    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    // เช็คว่า bank นี้เป็นของ lessor ที่ login มาหรือไม่
    if (bank.lessor.toString() !== lessorId.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only edit your own bank" });
    }

    // ถ้าเป็นเจ้าของจริง ให้อัปเดต
    const updatedBank = await Bank.findByIdAndUpdate(
      bankId,
      { name, accountNumber, bankName, image },
      { new: true }
    ).populate("lessor", "name");

    res
      .status(200)
      .json({ message: "Bank updated successfully", bank: updatedBank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update bank" });
  }
};

//readBank by lessor id
const readBankByLessor = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lessorId = decoded.id;
    const lessor = await Lessors.findById(lessorId);
    if (!lessor) {
      return res.status(404).json({ message: "Lessor not found" });
    }
    const banks = await Bank.find({ lessor: lessorId })
    res.status(200).json({ banks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch banks" });
  }
};

module.exports = {
  createBank,
  readBank,
  updateBank,
  readBankByLessor,
};
