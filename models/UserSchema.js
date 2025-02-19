const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, unique: true, trim: true },
  password: {
    type: String,
    required: true,
  },
  flatCode: {
    type: String,
    required: true,
    trim: true,
  },
  karmaPoints: { type: Number, default: 0 },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
