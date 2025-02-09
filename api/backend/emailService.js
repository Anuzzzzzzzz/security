const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anuj.paudel061@gmail.com", //email
    pass: "pxwk sfmv ncbp niiw", // password
  },
});

const sendEmail = async (email, message) => {
  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset",
      text: message,
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
