const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const currentTime = Date.now();
    const lastActivity = user.lastActivity || 0;

    // **1. Show warning after 30 seconds of inactivity**
    if (currentTime - lastActivity > 30 * 1000) {
      console.log("Warning: User inactive for 30 seconds.");
      // You can trigger a frontend alert for inactivity
    }

    // **2. Logout after 3 minutes of inactivity**
    if (currentTime - lastActivity > 3 * 60 * 1000) {
      res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
      return res
        .status(401)
        .json({
          message: "Session expired due to inactivity. Please login again.",
        });
    }

    // **3. Update last activity timestamp**
    user.lastActivity = currentTime;
    await user.save();

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

module.exports = { protect };
