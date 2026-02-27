// Import Express framework
const express = require("express");

// Import authentication routes (v1 version)
const authRouter = require("./routes/v1/auth");

// Import CORS middleware for enabling Cross-Origin Resource Sharing
const cors = require("cors");

// Import path module for handling file paths
const path = require("path");

// Import body-parser middleware for parsing request bodies
const bodyParser = require("body-parser");

// Initialize Express application
const app = express();

/**
 * Serve static files for course covers.
 * URL path '/courses/covers' maps to the local directory 'public/courses/covers'.
 * This allows clients to access cover images via /courses/covers/filename.jpg
 */
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers")),
);

// Enable CORS for all routes (allows cross-origin requests)
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms) – extended: false uses querystring library
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

/**
 * Mount authentication routes under /v1/auth.
 * All routes defined in authRouter will be prefixed with /v1/auth.
 */
app.use("/v1/auth", authRouter);

// Export the configured app instance for use in server.js or bin/www
module.exports = app;
