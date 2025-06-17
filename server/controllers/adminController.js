const User = require('../models/User');
const Order = require('../models/Order');
const Book = require('../models/Book');

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalBooks = await Book.countDocuments();
  res.json({ totalUsers, totalOrders, totalBooks });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user_id');
  res.json(orders);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};