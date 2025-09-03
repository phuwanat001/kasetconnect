const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
      
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^0\d{9}$/.test(v), // format เบอร์โทรไทย
        message: (props) => `${props.value} ไม่ใช่เบอร์โทรที่ถูกต้อง`,
      },
    },
    rentalStartDate: {
      type: Date,
      required: true,
    },
    rentalEndDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.rentalStartDate;
        },
        message: "วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มเช่า",
      },
    },
    returnDate: {
      type: Date,
    },
    deposit: {
      ref: "Deposit",
      type: mongoose.Schema.Types.ObjectId,
      
    },
    status: {
      type: String,
      enum: [
        "รออนุมัติ",
        "อนุมัติแล้ว",
        "รับของแล้ว",
        "กำลังใช้งาน",
        "เสร็จสิ้น",
        "ยกเลิกแล้ว",
        "เกินกำหนดคืน",
        "อยู่ระหว่างคืน",
        "คืนแล้ว",
        "เสียหาย",
        "จ่ายค่าเสียหายแล้ว",
        "สูญหาย",
      ],
      default: "รออนุมัติ",
    },
  },
  {
    timestamps: true,
  }
);

// เพิ่ม index เพื่อค้นหาข้อมูลง่ายขึ้น
rentalSchema.index({ customer: 1, status: 1 });

const Rental = mongoose.model("Rental", rentalSchema);
module.exports = Rental;
