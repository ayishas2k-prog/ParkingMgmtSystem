const express = require('express');
const router = express.Router();
const vehicleInOutController = require('../controllers/vehicleInOutController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', vehicleInOutController.create);
router.get('/', vehicleInOutController.getAll);
router.get('/:id/check', vehicleInOutController.check);

router.get('/:id', vehicleInOutController.getById);
router.put('/:id', vehicleInOutController.update);
router.delete('/:id', vehicleInOutController.delete);

module.exports = router;
