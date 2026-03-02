const UserVehicle = require('../models/userVehicleModel');
const VehicleInfo = require('../models/vehicleInfoModel');
const Notification = require('../models/notificationModel');
const UserPayment = require('../models/userPaymentModel');

/**
 * GET /api/user/vehicles/:id
 * Gets Vehicle last parking information of the logged in user.
 */
const getVehicleLastParking = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleId = req.params.id;
    const parkingInfo = await UserVehicle.getLastParkingInfo(userId, vehicleId);
    if (!parkingInfo) {
      return res.status(404).json({ message: 'No parking information found for this vehicle.' });
    }
    res.json(parkingInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * GET /api/user/vehicles
 * Gets all the Vehicles owned by the logged in user.
 */
const getUserVehicles = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicles = await UserVehicle.findByUserId(userId);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * POST /api/user/vehicles
 * Creates a Vehicle record owned by the logged in user.
 */
const createUserVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleData = req.body;
    
    // Check if vehicle already exists by number
    let vehicle = await VehicleInfo.findByVehicleNumber(vehicleData.VehicleNumber);
    let vehicleId;

    if (!vehicle) {
      vehicleId = await VehicleInfo.create(vehicleData);
    } else {
      vehicleId = vehicle.id;
    }

    // Link vehicle to user if not already linked
    const existingLink = await UserVehicle.findByUserIdAndVehicleId(userId, vehicleId);
    if (!existingLink) {
      await UserVehicle.create(userId, vehicleId);
    }

    res.status(201).json({ message: 'Vehicle added successfully', vehicleId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * PUT /api/user/vehicles/:id
 * Updates a Vehicle record owned by the logged in user.
 */
const updateUserVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleId = req.params.id;
    const vehicleData = req.body;

    const vehicle = await UserVehicle.findByUserIdAndVehicleId(userId, vehicleId);
    if (!vehicle) {
      return res.status(403).json({ message: 'Access denied or vehicle not found.' });
    }

    await VehicleInfo.update(vehicleId, vehicleData);
    res.json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * DELETE /api/user/vehicles/:id
 * Deletes a Vehicle record owned by the logged in user.
 */
const deleteUserVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleId = req.params.id;

    const vehicle = await UserVehicle.findByUserIdAndVehicleId(userId, vehicleId);
    if (!vehicle) {
      return res.status(403).json({ message: 'Access denied or vehicle not found.' });
    }

    // Remove the link
    await UserVehicle.delete(userId, vehicleId);
    
    // Optionally delete from vehicle_info if no one else owns it?
    // For now just remove the ownership link as requested.
    
    res.json({ message: 'Vehicle removed from your account' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * GET /api/user/notifications
 * Gets all the unread notifications of the logged in user.
 */
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findByUserId(userId, true);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * PUT /api/user/notifications/:id
 * Updates a notification as read for the logged in user.
 */
const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;
    
    const affected = await Notification.updateReadStatus(notificationId, userId, true);
    if (affected === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * GET /api/user/payments
 * Gets all the pending payments for all the Vehicles owned by the logged in user.
 */
const getUserPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await UserPayment.findByUserId(userId, true);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * PUT /api/user/payments/:id
 * updates payments information for the selected payment id of the logged in user.
 */
const updateUserPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentId = req.params.id;
    const paymentData = req.body;

    const affected = await UserPayment.update(paymentId, userId, paymentData);
    if (affected === 0) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    res.json({ message: 'Payment information updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getVehicleLastParking,
  getUserVehicles,
  createUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
  getUserNotifications,
  markNotificationAsRead,
  getUserPayments,
  updateUserPayment
};
