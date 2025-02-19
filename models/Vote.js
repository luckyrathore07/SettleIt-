const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
  voteType: { type: String, enum: ["upvote", "downvote"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("vote", voteSchema);
