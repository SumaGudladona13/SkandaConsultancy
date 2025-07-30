const mongoose = require("mongoose");

const EventFeatureSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: String,
  description: String,
  features: [String]
});

module.exports = mongoose.model("EventFeature", EventFeatureSchema);
