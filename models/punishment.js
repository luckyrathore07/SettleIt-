const mongoose = require("mongoose");

const punishmentSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },

  punishmentText: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Punishment", punishmentSchema);
