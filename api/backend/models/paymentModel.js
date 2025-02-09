const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true, // Set to true since it's now required for card payments
    },
    nameSurname: {
      type: String,
      required: true, // Set to true for user's name
    },
    email: {
      type: String,
      required: true, // Set to true for email associated with the payment
    },
    expDate: {
      type: String,
      required: true, // Set to true for the expiration date
    },
    cvv: {
      type: String,
      required: true, // Set to true for the CVV number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
