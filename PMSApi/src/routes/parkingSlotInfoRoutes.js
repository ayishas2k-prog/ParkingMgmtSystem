const express = require('express');
const router = express.Router();
const parkingSlotInfoController = require('../controllers/parkingSlotInfoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', parkingSlotInfoController.create);
router.get('/', parkingSlotInfoController.getAll);
router.get('/:slotNumber', parkingSlotInfoController.getBySlotNumber);
router.put('/:id', parkingSlotInfoController.update);
router.delete('/:id', parkingSlotInfoController.delete);

module.exports = router;
