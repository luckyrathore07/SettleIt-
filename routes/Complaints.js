const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  resolveComplaint,
} = require("../controllers/complaint");

router.post("/createComplaint", createComplaint);
router.get("/getComplaints", getComplaints);
router.post("/resolveComplaint", resolveComplaint);

module.exports = router;
