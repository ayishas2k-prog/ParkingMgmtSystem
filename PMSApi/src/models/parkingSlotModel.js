const db = require('../config/db');

const ParkingSlot = {
  /**
   * Creates a new parking slot entry in the database.
   * @param {object} newSlot - The parking slot object.
   * @returns {Promise<number>} The ID of the newly created entry.
   */
  create: async (newSlot) => {
    const [result] = await db.query('INSERT INTO parking_slots SET ?', [newSlot]);
    return result.insertId;
  },
  /**
   * Retrieves all parking slot entries from the database.
   * @returns {Promise<Array<object>>} An array of parking slot entries.
   */
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM parking_slots');
    return rows;
  },
  /**
   * Finds a parking slot entry by its ID.
   * @param {number} id - The ID of the slot to search for.
   * @returns {Promise<object|undefined>} The parking slot object if found, otherwise undefined.
   */
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM parking_slots WHERE Id = ?', [id]);
    return rows[0];
  },
  /**
   * Updates a parking slot entry in the database.
   * @param {number} id - The ID of the slot to update.
   * @param {object} data - The data to update the slot with.
   * @returns {Promise<number>} The number of affected rows.
   */
  update: async (id, data) => {
    const [result] = await db.query('UPDATE parking_slots SET ? WHERE Id = ?', [data, id]);
    return result.affectedRows;
  },
  /**
   * Deletes a parking slot entry from the database.
   * @param {number} id - The ID of the slot to delete.
   * @returns {Promise<number>} The number of affected rows.
   */
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM parking_slots WHERE Id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = ParkingSlot;
