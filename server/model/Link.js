const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true },
  target: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Link", linkSchema);
