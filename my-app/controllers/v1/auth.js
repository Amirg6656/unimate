const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const registerValidator = require("./../../validators/register");
const jwt = require("jsonwebtoken");

// Controller function for user registration
exports.register = async (req, res) => {
  // Validate the request body using the registerValidator
  const validationResult = registerValidator(req.body);
  // If validation fails (returns an error object), respond with 422 Unprocessable Entity and the validation errors
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }

  // Destructure the required fields from the request body
  const {
    username,
    firstName,
    lastName,
    fatherName,
    phone,
    address,
    idCard,
    password,
    fieldOfStudy,
    educationLevel,
  } = req.body;

  // Check if a user with the given username already exists in the database
  const isUserExists = await userModel.findOne({
    $or: [{ username }], // Using $or for potential future expansion (e.g., email)
  });

  // If user exists, return a 409 Conflict response with a Persian error message
  if (isUserExists) {
    return res.status(409).json({
      message: "username is duplicated!", // "Username is duplicate!"
    });
  }

  const countOfUsers = await userModel.estimatedDocumentCount();

  const hashedPassword = await bcrypt.hash(password, 12);

  const fullName = `${firstName} ${lastName}`;

  const user = await userModel.create({
    fullName,
    fatherName,
    username,
    phone,
    address,
    idCard,
    fieldOfStudy,
    educationLevel,
    password: hashedPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(201).json({ user, accessToken });
};

exports.login = async (req, res) => {};

exports.getMe = async (req, res) => {};
