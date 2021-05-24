const mongoose = require("mongoose");
const { Schema } = mongoose;

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  created_by: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("Board", BoardSchema);
