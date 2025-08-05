const mongoose = require("mongoose");
const { create } = require("../customer/customer.model");
const schemaAdmin = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", schemaAdmin);
module.exports = Admin;