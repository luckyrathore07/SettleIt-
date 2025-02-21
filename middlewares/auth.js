const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
   
dotenv.config();
     
exports.authMiddleware = (req, res, next) => {
  try {
     
    const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");
    // const token =
    // req.cookies.authToken ||
    // req.header("Authorization")?.replace("Bearer ", "");
console.log("backend me hu2")
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    console.log("backend me hu3")
    console.log("token verifyed")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token verifyed")
    req.user = decoded;  
    console.log("token verifyed")
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};