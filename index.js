const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to db
const db = mongoose.connect('mongodb://localhost:27017/bookcli', {
  useMongoClient: true
});

// Import model
const Book = require('./models/book');

// Add Book
const addBook = (book) => {
  Book.create(book).then(book => {
    console.info('New Book Added');
    db.close();
  });
}

// Search Book
const searchBook = (name) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  Book.find({$or: [{bookname: search}, {author: search}]}).lean().exec()
    .then(books => {
      console.info(books);
      console.info(`${books.length} matches`);
      db.close();
    });
}

// Find Book By Id
const findBookById = (id) => {
  // Make case insensitive
  Book.findOne({_id:id}).lean().exec()
    .then(book => {
      console.info(book);
      db.close();
    });
}

// Update Book
const updateBook = (_id, book) => {
  Book.update({ _id }, book)
    .then(book => {
      console.info('Book Updated');
      db.close();
    });
}

// Remove Book
const removeBook = (_id) => {
  Book.remove({ _id })
    .then(book => {
      console.info('Book Removed');
      db.close();
    });
}

// List Books
const listBooks = () => {
  Book.find().lean().exec()
    .then(books => {
      console.info(books);
      console.info(`${books.length} Books`);
      db.close();
    });
}

// Export All Methods
module.exports = {
  addBook,
  searchBook,
  findBookById,
  updateBook,
  removeBook,
  listBooks
}
