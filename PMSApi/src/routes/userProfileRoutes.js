const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes here require authentication
router.use(authMiddleware);

// Vehicle routes
router.get('/vehicles/:id', userProfileController.getVehicleLastParking);
router.get('/vehicles', userProfileController.getUserVehicles);
router.post('/vehicles', userProfileController.createUserVehicle);
router.put('/vehicles/:id', userProfileController.updateUserVehicle);
router.delete('/vehicles/:id', userProfileController.deleteUserVehicle);

// Notification routes
router.get('/notifications', userProfileController.getUserNotifications);
router.put('/notifications/:id', userProfileController.markNotificationAsRead);

// Payment routes
router.get('/payments', userProfileController.getUserPayments);
router.put('/payments/:id', userProfileController.updateUserPayment);

module.exports = router;
