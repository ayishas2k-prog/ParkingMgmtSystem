const db = require('../config/db');

const User = {
  /**
   * Creates a new user in the database.
   * @param {object} newUser - The user object containing user details.
   * @param {string} newUser.email - The email of the new user.
   * @param {string} newUser.password - The hashed password of the new user.
   * @returns {Promise<number>} The ID of the newly created user.
   */
  create: async (newUser) => {
    const [result] = await db.query('INSERT INTO users SET ?', [newUser]);
    return result.insertId;
  },
  /**
   * Finds a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<object|undefined>} The user object if found, otherwise undefined.
   */
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  /**
   * Finds a user by their ID.
   * @param {number} id - The ID of the user to search for.
   * @returns {Promise<object|undefined>} The user object if found, otherwise undefined.
   */
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;
