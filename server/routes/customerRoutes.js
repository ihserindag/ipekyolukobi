const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Tüm rotalar için kimlik doğrulaması gerekir
router.use(authenticateToken);

// Müşteri Rotaları
router.get('/', customerController.getAllCustomers);
router.post('/', isAdmin, customerController.createCustomer);
router.put('/:id', isAdmin, customerController.updateCustomer);
router.delete('/:id', isAdmin, customerController.archiveCustomer);

// Arşiv Rotaları
router.get('/archive', isAdmin, customerController.getArchivedCustomers);
router.post('/:id/restore', isAdmin, customerController.restoreCustomer);


module.exports = router;
