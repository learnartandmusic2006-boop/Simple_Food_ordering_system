const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
  description: String,
  price: Number,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("MenuItem", menuSchema);
 