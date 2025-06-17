const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/premium/:id', userController.upgradeToPremium);
router.put('/ban/:id', userController.banUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;