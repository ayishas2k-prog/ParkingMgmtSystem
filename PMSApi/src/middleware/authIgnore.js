const jwt = require('jsonwebtoken');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authIgnore = (req, res, next) => {
 
    next();
 
};

module.exports = authIgnore;
