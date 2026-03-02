const db = require('../config/db');

const VehicleInfo = {
  /**
   * Creates a new vehicle information entry in the database.
   * @param {object} newVehicle - The vehicle information object.
   * @returns {Promise<number>} The ID of the newly created entry.
   */
  create: async (newVehicle) => {
    const [result] = await db.query('INSERT INTO vehicle_info SET ?', [newVehicle]);
    return result.insertId;
  },
  /**
   * Retrieves all vehicle information entries from the database.
   * @returns {Promise<Array<object>>} An array of vehicle information entries.
   */
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM vehicle_info');
    return rows;
  },
  /**
   * Finds a vehicle information entry by its vehicle number.
   * @param {string} vehicleNumber - The vehicle number to search for.
   * @returns {Promise<object|undefined>} The vehicle information entry object if found, otherwise undefined.
   */
  findByVehicleNumber: async (vehicleNumber) => {
    const [rows] = await db.query('SELECT * FROM vehicle_info WHERE VehicleNumber = ?', [vehicleNumber]);
    return rows[0];
  },
  /**
   * Updates a vehicle information entry in the database.
   * @param {number} id - The ID of the entry to update.
   * @param {object} data - The data to update the entry with.
   * @returns {Promise<number>} The number of affected rows.
   */
  update: async (id, data) => {
    const [result] = await db.query('UPDATE vehicle_info SET ? WHERE id = ?', [data, id]);
    return result.affectedRows;
  },
  /**
   * Deletes a vehicle information entry from the database.
   * @param {number} id - The ID of the entry to delete.
   * @returns {Promise<number>} The number of affected rows.
   */
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM vehicle_info WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = VehicleInfo;
