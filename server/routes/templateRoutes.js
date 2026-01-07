const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', templateController.getAllTemplates);
router.post('/', isAdmin, templateController.createTemplate);
router.delete('/:id', isAdmin, templateController.deleteTemplate);

module.exports = router;
