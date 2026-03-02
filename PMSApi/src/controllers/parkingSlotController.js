const ParkingSlot = require('../models/parkingSlotModel');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const create = async (req, res) => {
  try {
    const newSlotId = await ParkingSlot.create(req.body);
    res.status(201).json({ message: 'Parking slot created successfully', id: newSlotId });
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
    const slots = await ParkingSlot.findAll();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getById = async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.status(200).json(slot);
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
    const affectedRows = await ParkingSlot.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.status(200).json({ message: 'Slot updated successfully' });
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
    const affectedRows = await ParkingSlot.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: del
};
