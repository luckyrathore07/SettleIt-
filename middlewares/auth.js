const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "")  ;
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1N2FkNTIwMmIzNzA2N2E5YmFiMDEiLCJpYXQiOjE3NDAwMzE3MzAsImV4cCI6MTc0MDExODEzMH0.Jxpg5hg-pJx8SznOjkqWE20NaHZLiftnhD2FrmZFVaA"
    console.log("token",token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}; 