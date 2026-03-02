const VehicleInfo = require('../models/vehicleInfoModel');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const create = async (req, res) => {
  try {
    const newVehicleId = await VehicleInfo.create(req.body);
    res.status(201).json({ message: 'Vehicle info created successfully', id: newVehicleId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAll = async (req, res) => {
  try {
    const vehicles = await VehicleInfo.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getByVehicleNumber = async (req, res) => {
  try {
    const vehicle = await VehicleInfo.findByVehicleNumber(req.params.vehicleNumber);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const update = async (req, res) => {
  try {
    const affectedRows = await VehicleInfo.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const del = async (req, res) => {
  try {
    const affectedRows = await VehicleInfo.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  create,
  getAll,
  getByVehicleNumber,
  update,
  delete: del
};
