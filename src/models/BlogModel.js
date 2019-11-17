
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image0: { type: String },
  image1: { type: String },
  image2: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model('BlogModel', blogSchema);
