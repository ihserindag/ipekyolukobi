const express = require('express');
const router = express.Router();
const funnelController = require('../controllers/funnelController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/analytics', funnelController.getFunnelAnalytics);
router.get('/kanban', funnelController.getKanbanData);
router.post('/move', isAdmin, funnelController.moveCustomerStage);
router.put('/notes', isAdmin, funnelController.updateStageNotes);

module.exports = router;
