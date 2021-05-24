const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  isListOf: { type: Schema.Types.ObjectId },
  isCopy: { type: Boolean, default: false },
});

module.exports = mongoose.model("List", ListSchema);
