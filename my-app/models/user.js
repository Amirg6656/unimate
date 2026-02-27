// models/user.js

// Import Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define the user schema
const schema = new mongoose.Schema(
  {
    // Full name of the user (required)
    fullName: {
      type: String,
      required: true,
    },
    // Father's name (optional – not required)
    fatherName: {
      type: String,
      required: false,
    },
    // Hashed password for authentication (required)
    password: {
      type: String,
      required: true,
    },
    // Unique username for login (required)
    username: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same username
    },
    // Phone number (optional)
    phone: {
      type: String,
      required: false,
    },
    // Physical address (optional)
    address: {
      type: String,
      required: false,
    },
    // National ID card number (optional)
    idCard: {
      type: String,
      required: false,
    },
    // Field of study (required)
    fieldOfStudy: {
      type: String,
      required: true,
    },
    // Educational level (required) – e.g., Bachelor, Master, PhD
    educationLevel: {
      type: String,
      required: true,
    },
    // User role: ADMIN or USER (defaults to USER)
    role: {
      type: String,
      enum: ["ADMIN", "USER"], // Only these two values are allowed
      default: "USER",
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  },
);

// Create the User model from the schema
const model = mongoose.model("User", schema);

// Export the model for use in other parts of the application
module.exports = model;
