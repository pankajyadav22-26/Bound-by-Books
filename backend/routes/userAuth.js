const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    console.log("Authenticating user...");
    const serviceToken = req.headers["x-api-key"];
    if (serviceToken && serviceToken === process.env.SERVICE_TOKEN) {
        console.log("Service token provided, skipping authentication");
        return next();
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "bookstore123", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired. Please sign in again" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };