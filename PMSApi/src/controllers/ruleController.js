const Rule = require('../models/ruleModel');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.findAll();
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getRuleByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const rule = await Rule.findByKey(key);
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }
    res.status(200).json(rule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllRules,
  getRuleByKey
};
