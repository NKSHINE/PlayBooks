const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  const item = new CartItem(req.body);
  await item.save();
  res.json(item);
};

exports.viewCart = async (req, res) => {
  const items = await CartItem.find({ user_id: req.user.id }).populate('book_id');
  res.json(items);
};

exports.removeFromCart = async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Removed from cart' });
};
