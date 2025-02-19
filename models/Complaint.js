const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  complaintType: {
    type: String,
    enum: ["Noise", "Cleanliness", "Bills", "Pets"],
  },
  severityLevel: {
    type: String,
    enum: ["Mild", "Annoying", "Major", "Nuclear"],
  },

  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Complaint", complaintSchema);
