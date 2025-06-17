const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/checkout', orderController.checkout);
router.get('/', orderController.getOrders);
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;