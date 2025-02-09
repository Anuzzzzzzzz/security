const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");

// User Registration with Validation
router.post(
  "/",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain at least one special character"),
  ],
  registerUser
);

// User Authentication (Login)
router.post(
  "/auth",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authUser
);

// User Logout
router.post("/logout", logoutUser);

// User Profile Routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Password Reset Routes
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Valid email is required")],
  requestPasswordReset
);
router.post(
  "/reset-password/:token",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  resetPassword
);

module.exports = router;
