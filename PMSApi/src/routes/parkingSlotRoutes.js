const express = require('express');
const router = express.Router();
const parkingSlotController = require('../controllers/parkingSlotController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', parkingSlotController.create);
router.get('/', parkingSlotController.getAll);
router.get('/:id', parkingSlotController.getById);
router.put('/:id', parkingSlotController.update);
router.delete('/:id', parkingSlotController.delete);

module.exports = router;
