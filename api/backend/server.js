const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// CORS Configuration (Security: Allow only specific domains in production)
app.use(
  cors({
    origin: ["http://localhost:5173"], // Update for production
    credentials: true,
  })
);

// Security & Logging Middleware
app.use(helmet()); // Helps secure the app by setting various HTTP headers
app.use(morgan("dev"));

// Rate Limiting (Security: Prevent brute force login attempts)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Allow max 5 login attempts within 15 minutes
  message: "Too many login attempts. Please try again later.",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // To parse cookies (needed for JWT)

app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => res.send("Server is running..."));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
