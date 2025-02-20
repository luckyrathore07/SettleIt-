const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  resolveComplaint,
  vote
} = require("../controllers/complaint");
const {
  authMiddleware
} = require("../middlewares/auth")

router.post("/createComplaint", createComplaint);
router.get("/getComplaints",authMiddleware, getComplaints);
router.post("/resolveComplaint", resolveComplaint);
router.post("/vote", vote);

module.exports = router;
