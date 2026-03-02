const db = require('../config/db');

const Gate = {
  /**
   * Creates a new gate in the database.
   * @param {object} newGate - The gate object containing gate details.
   * @param {string} newGate.GateName - The name of the new gate.
   * @param {string} newGate.GateType - The type of the new gate.
   * @returns {Promise<number>} The ID of the newly created gate.
   */
  create: async (newGate) => {
    const [result] = await db.query('INSERT INTO gates SET ?', [newGate]);
    return result.insertId;
  },
  /**
   * Finds all gates.
   * @returns {Promise<object[]>} A list of all gates.
   */
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM gates');
    return rows;
  },
  /**
   * Finds a gate by its ID.
   * @param {number} id - The ID of the gate to search for.
   * @returns {Promise<object|undefined>} The gate object if found, otherwise undefined.
   */
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM gates WHERE Id = ?', [id]);
    return rows[0];
  },
  /**
   * Updates a gate in the database.
   * @param {number} id - The ID of the gate to update.
   * @param {object} gate - The gate object containing the updated details.
   * @returns {Promise<number>} The number of affected rows.
   */
  update: async (id, gate) => {
    const [result] = await db.query('UPDATE gates SET ? WHERE Id = ?', [gate, id]);
    return result.affectedRows;
  },
  /**
   * Deletes a gate from the database.
   * @param {number} id - The ID of the gate to delete.
   * @returns {Promise<number>} The number of affected rows.
   */
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM gates WHERE Id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Gate;
