// controllers/auth.js

// Import the User model for database operations
const userModel = require("../../models/user");
// Import bcrypt for password hashing and comparison
const bcrypt = require("bcrypt");
// Import the registration validation schema/function
const registerValidator = require("./../../validators/register");
// Import jsonwebtoken for creating and verifying JWTs
const jwt = require("jsonwebtoken");

/**
 * Register a new user.
 * Steps:
 * 1. Validate request body against registerValidator.
 * 2. Check if username already exists.
 * 3. Determine role: first user becomes ADMIN, others USER.
 * 4. Hash the password.
 * 5. Create user in database.
 * 6. Remove password from response object.
 * 7. Generate JWT access token.
 * 8. Send back user data (without password) and token.
 */
exports.register = async (req, res) => {
  // Validate incoming data
  const validationResult = registerValidator(req.body);
  if (validationResult !== true) {
    // 422 Unprocessable Entity – validation failed
    return res.status(422).json(validationResult);
  }

  // Extract fields from request body
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

  // Check for existing user with same username (or email in future)
  const isUserExists = await userModel.findOne({
    $or: [{ username }],
  });

  if (isUserExists) {
    // 409 Conflict – resource already exists
    return res.status(409).json({
      message: "username is duplicated!", // Persian: "یوزرنیم تکراری است!"
    });
  }

  // Count total users to assign role: first user is ADMIN
  const countOfUsers = await userModel.estimatedDocumentCount();

  // Hash the password with bcrypt (salt rounds = 12)
  const hashedPassword = await bcrypt.hash(password, 12);

  // Combine first and last name into fullName
  const fullName = `${firstName} ${lastName}`;

  // Create new user document in MongoDB
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
    role: countOfUsers > 0 ? "USER" : "ADMIN", // first user gets ADMIN
  });

  // Convert mongoose document to plain object and delete password field
  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  // Generate JWT access token (expires in 30 days)
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  // Respond with 201 Created, user data and token
  return res.status(201).json({ user: userObject, accessToken });
};

/**
 * Log in an existing user.
 * Steps:
 * 1. Find user by username or email (identifier field).
 * 2. If not found, return 401.
 * 3. Compare provided password with stored hash.
 * 4. If mismatch, return 401.
 * 5. Generate JWT token.
 * 6. Return token.
 */
exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  // Find user where username OR email matches the identifier
  const user = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    // 401 Unauthorized – user not found
    return res.status(401).json({
      message: "There is no user with this phone number or username", // note: typo in original: "massage"
    });
  }

  // Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is not valid!", // original had "massage"
    });
  }

  // Generate JWT token (valid for 30 days)
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  // Send token to client (original variable name had typo: "acsessToken")
  return res.json({ accessToken });
};

/**
 * Get information of the currently authenticated user.
 * (To be implemented – should return user data based on token payload.)
 */
exports.getMe = async (req, res) => {
  // TODO: Extract user ID from req.user (set by authentication middleware)
  // and fetch user document from database, then return it.
};
