const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
   
dotenv.config();
     
exports.authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies.authToken ||
      req.header("Authorization")?.replace("Bearer ", "");

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