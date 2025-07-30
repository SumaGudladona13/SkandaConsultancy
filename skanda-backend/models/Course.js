const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Course", CourseSchema);
