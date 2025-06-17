const Coupon = require('../models/Coupon');
const UserCoupon = require('../models/UserCoupon');

exports.createCoupon = async (req, res) => {
  const coupon = new Coupon(req.body);
  await coupon.save();
  res.json(coupon);
};

exports.getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
};

exports.updateCoupon = async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(coupon);
};

exports.deactivateCoupon = async (req, res) => {
  await Coupon.findByIdAndUpdate(req.params.id, { is_active: false });
  res.json({ message: 'Coupon deactivated' });
};

exports.applyCoupon = async (req, res) => {
  const { user_id, code } = req.body;
  const coupon = await Coupon.findOne({ code, is_active: true });
  if (!coupon) return res.status(400).json({ message: 'Invalid coupon' });
  const usage = await UserCoupon.findOne({ user_id, coupon_id: coupon._id });
  if (usage) return res.status(400).json({ message: 'Coupon already used' });
  await new UserCoupon({ user_id, coupon_id: coupon._id, used_at: new Date() }).save();
  res.json({ discount_percent: coupon.discount_percent });
};