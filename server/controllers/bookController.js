const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().populate('author_id genre_id language_id');
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author_id genre_id language_id');
  res.json(book);
};

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};