const mongoose = require("mongoose");

const lessorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {

      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
      },
    ],
    birthdate: {
      // ✔️ แก้ชื่อให้ตรงกับ postUser
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Lessors = mongoose.model("Lessors", lessorSchema);
module.exports = Lessors;
