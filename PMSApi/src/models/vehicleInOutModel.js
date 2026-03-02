const db = require('../config/db');

const VehicleInOut = {
  /**
   * Creates a new vehicle in/out entry in the database.
   * @param {object} newEntry - The vehicle in/out entry object.
   * @returns {Promise<number>} The ID of the newly created entry.
   */
  create: async (newEntry) => {
    const [result] = await db.query('INSERT INTO vehicle_inout SET ?', [newEntry]);
    return result.insertId;
  },
  /**
   * Retrieves all vehicle in/out entries from the database.
   * @returns {Promise<Array<object>>} An array of vehicle in/out entries.
   */
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM vehicle_inout');
    return rows;
  },
  /**
   * Finds a vehicle in/out entry by its ID.
   * @param {number} id - The ID of the entry to search for.
   * @returns {Promise<object|undefined>} The vehicle in/out entry object if found, otherwise undefined.
   */
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM vehicle_inout WHERE id = ?', [id]);
    return rows[0];
  },
  findByVN: async (vn) => {
    const [rows] = await db.query('SELECT * FROM vehicle_inout WHERE VehicleNumber = ?', [vn]);
    return rows[0];
  },

  check: async (id) => {
    const [rows] = await db.query('SELECT top 1 * FROM vehicle_inout WHERE id = ? and OutTime = null order by intime desc', [id]);
    return rows[0];
  },

  /**
   * Updates a vehicle in/out entry in the database.
   * @param {number} id - The ID of the entry to update.
   * @param {object} data - The data to update the entry with.
   * @returns {Promise<number>} The number of affected rows.
   */
  update: async (id, data) => {
    const [result] = await db.query('UPDATE vehicle_inout SET ? WHERE id = ?', [data, id]);
    return result.affectedRows;
  },
  /**
   * Deletes a vehicle in/out entry from the database.
   * @param {number} id - The ID of the entry to delete.
   * @returns {Promise<number>} The number of affected rows.
   */
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM vehicle_inout WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = VehicleInOut;
