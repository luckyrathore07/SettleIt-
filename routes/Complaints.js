const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  resolveComplaint,
} = require("../controllers/complaint");

router.post("/createComplaint", createComplaint);
router.get("/getComplaints", getComplaints);
router.get("/resolveComplaint", resolveComplaint);

module.exports = router;
