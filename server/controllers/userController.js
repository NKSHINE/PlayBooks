const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(updated);
};

exports.upgradeToPremium = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, { is_premium: true }, { new: true });
  res.json(updated);
};

exports.banUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, { status: 'banned' }, { new: true });
  res.json(updated);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};