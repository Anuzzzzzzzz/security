const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create the transporter using your Gmail account and app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your App Password (or OAuth token)
  },
});

// Function to send a password reset email
const sendResetEmail = async (userEmail, resetToken) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <p><a href="${resetLink}" target="_blank">Reset Your Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send the password reset email");
  }
};

module.exports = { sendResetEmail };
