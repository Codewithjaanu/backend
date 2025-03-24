const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization"); // Get the Authorization header

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(authHeader,process.env.MY_JWT_TOKEN); // Use a standard env variable name
        req.user = decoded; // Attach user info to request
        next(); // Proceed to next middleware or route
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token has expired." });
        }
        return res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = authenticateToken;
