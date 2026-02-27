// routes/auth.js

// Import Express.js framework
const express = require("express");

// Import authentication controller (handlers for register, login, getMe)
const controller = require("../../controllers/v1/auth");

// Create a new Express router instance to define auth-related routes
const router = express.Router();

/**
 * POST /register
 * Route for user registration.
 * Calls the register method from the auth controller.
 */
router.post("/register", controller.register);

/**
 * POST /login
 * Route for user login.
 * Calls the login method from the auth controller.
 */
router.post("/login", controller.login);

/**
 * GET /me
 * Route to fetch information of the currently authenticated user.
 * Calls the getMe method from the auth controller.
 * Note: This endpoint is intended to be protected; authentication middleware should be added.
 */
router.get("/me", controller.getMe);

// Export the router so it can be mounted in the main app
module.exports = router;
