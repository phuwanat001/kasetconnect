const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    }
    ,
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["deposit", "full"],
      default: "full"
    },
    paidAmount: {
      type: Number,
      required: true
    },
    deliveryAddress: {
      street: String,
      city: String,
      country: String,
      zipCode: String,
    },
    phone: {
      type: String,
      required: true,
    },
    rentalStartDate: {
      type: Date,
      required: true,
    },
    rentalEndDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    paymentSlip: {
      type: String
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

const Rental = mongoose.model("Rental", rentalSchema);
module.exports = Rental;
