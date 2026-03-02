const Gate = require('../models/gateModel');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createGate = async (req, res) => {
  try {
    const { GateName, GateType } = req.body;
    if (!GateName || !GateType) {
      return res.status(400).json({ message: 'Please provide GateName and GateType' });
    }

    const newGate = {
      GateName,
      GateType
    };

    const gateId = await Gate.create(newGate);
    res.status(201).json({ message: 'Gate created successfully', gateId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllGates = async (req, res) => {
  try {
    const gates = await Gate.findAll();
    res.status(200).json(gates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getGateById = async (req, res) => {
  try {
    const { id } = req.params;
    const gate = await Gate.findById(id);
    if (!gate) {
      return res.status(404).json({ message: 'Gate not found' });
    }
    res.status(200).json(gate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateGate = async (req, res) => {
  try {
    const { id } = req.params;
    const { GateName, GateType } = req.body;

    const updated = await Gate.update(id, { GateName, GateType });
    if (updated === 0) {
      return res.status(404).json({ message: 'Gate not found' });
    }
    res.status(200).json({ message: 'Gate updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteGate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Gate.delete(id);
    if (deleted === 0) {
      return res.status(404).json({ message: 'Gate not found' });
    }
    res.status(200).json({ message: 'Gate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createGate,
  getAllGates,
  getGateById,
  updateGate,
  deleteGate
};
