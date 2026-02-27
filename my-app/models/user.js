const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    idCard: {
      type: String,
      required: false,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model("User", schema);

module.exports = model;
