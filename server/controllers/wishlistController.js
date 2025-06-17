const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
  const item = new Wishlist(req.body);
  await item.save();
  res.json(item);
};

exports.getWishlist = async (req, res) => {
  const items = await Wishlist.find({ user_id: req.user.id }).populate('book_id');
  res.json(items);
};

exports.removeFromWishlist = async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Removed from wishlist' });
};
