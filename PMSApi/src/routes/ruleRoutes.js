const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, ruleController.getAllRules);
router.get('/:key', authMiddleware, ruleController.getRuleByKey);

module.exports = router;
