const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new mongoose.Schema({
  content: { type: String, required: true },
  displayOrder: { type: Number, default: 0 },
});

module.exports = mongoose.model("Card", CardSchema);
