const ParkingSlotInfo = require('../models/parkingSlotInfoModel');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const create = async (req, res) => {
  try {
    const newSlotInfoId = await ParkingSlotInfo.create(req.body);
    res.status(201).json({ message: 'Parking slot info created successfully', id: newSlotInfoId });
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
    const slotInfos = await ParkingSlotInfo.findAll();
    res.status(200).json(slotInfos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getBySlotNumber = async (req, res) => {
  try {
    const slotInfo = await ParkingSlotInfo.findBySlotNumber(req.params.slotNumber);
    if (!slotInfo) {
      return res.status(404).json({ message: 'Slot info not found' });
    }
    res.status(200).json(slotInfo);
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
    const affectedRows = await ParkingSlotInfo.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Slot info not found' });
    }
    res.status(200).json({ message: 'Slot info updated successfully' });
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
    const affectedRows = await ParkingSlotInfo.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Slot info not found' });
    }
    res.status(200).json({ message: 'Slot info deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  create,
  getAll,
  getBySlotNumber,
  update,
  delete: del
};
