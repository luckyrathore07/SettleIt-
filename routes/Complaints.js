const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  resolveComplaint,
  vote,
  fetchMostUpvotedComplaints,
  fetchAllComplaints
} = require("../controllers/complaint");
const {
  authMiddleware
} = require("../middlewares/auth")

router.post("/createComplaint",authMiddleware, createComplaint);
router.get("/getComplaints", getComplaints);
router.post("/resolveComplaint",authMiddleware, resolveComplaint);
router.post("/vote",authMiddleware, vote);
router.get("/fetchMostUpvotedComplaints", fetchMostUpvotedComplaints);
router.get("/fetchAllComplaints", fetchAllComplaints);
module.exports = router;
