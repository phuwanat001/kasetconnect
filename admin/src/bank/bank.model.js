const mongoose = require("mongoose");
const BankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    image: { type: String },
    lessor: { type: mongoose.Schema.Types.ObjectId, ref: "Lessors" },

  },
  { timestamps: true }
);
const Bank = mongoose.model("Bank", BankSchema);
module.exports = Bank;
