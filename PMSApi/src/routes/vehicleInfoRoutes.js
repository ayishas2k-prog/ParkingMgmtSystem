const express = require('express');
const router = express.Router();
const vehicleInfoController = require('../controllers/vehicleInfoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', vehicleInfoController.create);
router.get('/', vehicleInfoController.getAll);
router.get('/:vehicleNumber', vehicleInfoController.getByVehicleNumber);
router.put('/:id', vehicleInfoController.update);
router.delete('/:id', vehicleInfoController.delete);

module.exports = router;
