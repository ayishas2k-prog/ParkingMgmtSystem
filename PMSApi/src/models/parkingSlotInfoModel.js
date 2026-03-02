const db = require('../config/db');

const ParkingSlotInfo = {
  /**
   * Creates a new parking slot information entry in the database.
   * @param {object} newSlotInfo - The parking slot information object.
   * @returns {Promise<number>} The ID of the newly created entry.
   */
  create: async (newSlotInfo) => {
    const [result] = await db.query('INSERT INTO parking_slot_info SET ?', [newSlotInfo]);
    return result.insertId;
  },
  /**
   * Retrieves all parking slot information entries from the database.
   * @returns {Promise<Array<object>>} An array of parking slot information entries.
   */
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM parking_slot_info');
    return rows;
  },
  /**
   * Finds a parking slot information entry by its slot number.
   * @param {string} slotNumber - The slot number to search for.
   * @returns {Promise<object|undefined>} The parking slot information entry object if found, otherwise undefined.
   */
  findBySlotNumber: async (slotNumber) => {
    const [rows] = await db.query('SELECT * FROM parking_slot_info WHERE SlotNumber = ?', [slotNumber]);
    return rows[0];
  },
  /**
   * Updates a parking slot information entry in the database.
   * @param {number} id - The ID of the entry to update.
   * @param {object} data - The data to update the entry with.
   * @returns {Promise<number>} The number of affected rows.
   */
  update: async (id, data) => {
    const [result] = await db.query('UPDATE parking_slot_info SET ? WHERE id = ?', [data, id]);
    return result.affectedRows;
  },
  /**
   * Deletes a parking slot information entry from the database.
   * @param {number} id - The ID of the entry to delete.
   * @returns {Promise<number>} The number of affected rows.
   */
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM parking_slot_info WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = ParkingSlotInfo;
