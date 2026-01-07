const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.use(authenticateToken, isAdmin);

router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);

module.exports = router;
