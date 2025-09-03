const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema(
  {
    rental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
      required: true,
    },
    status: {
      type: String,
      enum: ["รอชำระค่ามัดจำ", "ชำระค่ามัดจำแล้ว"],
      default: "รอชำระค่ามัดจำ",
    },
    image: {
      type: String, // เก็บ URL ของ slip หรือหลักฐานการโอน
    },
  },
  { timestamps: true }
);

// index สำหรับค้นหามัดจำตาม rental + สถานะ
DepositSchema.index({ rental: 1, status: 1 });

const Deposit = mongoose.model("Deposit", DepositSchema);
module.exports = Deposit;
