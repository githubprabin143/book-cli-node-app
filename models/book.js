const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
  bookname: { type: String },
  author: { type: String },
  price: { type: Number }
});

// Define and export
module.exports = mongoose.model('Book', bookSchema);