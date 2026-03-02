const express = require('express');
const router = express.Router();
const gateController = require('../controllers/gateController');


//const authMiddleware = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authIgnore.js');

router.post('/', authMiddleware, gateController.createGate);
router.get('/', authMiddleware, gateController.getAllGates);
router.get('/:id', authMiddleware, gateController.getGateById);
router.put('/:id', authMiddleware, gateController.updateGate);
router.delete('/:id', authMiddleware, gateController.deleteGate);

module.exports = router;
