const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    const { cart } = req.body;

    try {
        const line_items = cart.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title,
                    images: [item.url],
                },
                unit_amount: item.price * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:5173/order-success",
            cancel_url: "http://localhost:5173/cart",
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Failed to create session" });
    }
});

module.exports = router;