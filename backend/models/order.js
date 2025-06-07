const mongoose = require("mongoose");

const order = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "books",
            required: true,
        },
        status: {
            type: String,
            default: "Order Placed",
            enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"],
        },
        paymentMode: {
            type: String,
            enum: ["COD", "Paid"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", order);