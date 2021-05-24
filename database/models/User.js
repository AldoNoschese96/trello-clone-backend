const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  boards: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("User", UserSchema);
