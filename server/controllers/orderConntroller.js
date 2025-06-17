const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.checkout = async (req, res) => {
  const { user_id, total_price, items } = req.body;
  const order = new Order({ user_id, total_price });
  await order.save();
  for (const item of items) {
    await new OrderItem({ ...item, order_id: order._id }).save();
  }
  res.json({ message: 'Order placed', order_id: order._id });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.user.id });
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
};