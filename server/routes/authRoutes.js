const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;
