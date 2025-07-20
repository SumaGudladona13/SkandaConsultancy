const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  image: String,
  type: String
});

module.exports = mongoose.model("Property", PropertySchema);