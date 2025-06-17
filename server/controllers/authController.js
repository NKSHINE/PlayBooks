const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');

exports.register = async (req, res) => {
  const { full_name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ full_name, email, password: hashed });
  await user.save();
  res.json({ message: 'Registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
  res.cookie('token', token).json({ message: 'Logged in' });
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};

exports.forgotPassword = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const reset = new PasswordReset({ user_id: user._id, otp, expires_at: Date.now() + 600000 });
  await reset.save();
  res.json({ message: 'OTP sent (simulate email)' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  const reset = await PasswordReset.findOne({ user_id: user._id, otp });
  if (!reset || reset.expires_at < Date.now()) return res.status(400).json({ message: 'Invalid or expired OTP' });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await PasswordReset.deleteOne({ _id: reset._id });
  res.json({ message: 'Password updated' });
};
