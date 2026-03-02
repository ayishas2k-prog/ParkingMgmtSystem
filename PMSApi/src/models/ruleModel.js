const db = require('../config/db');

const Rule = {
  /**
   * Finds all rules.
   * @returns {Promise<object[]>} A list of all rules.
   */
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM rules');
    return rows;
  },
  /**
   * Finds a rule by its key.
   * @param {string} key - The key of the rule to search for.
   * @returns {Promise<object|undefined>} The rule object if found, otherwise undefined.
   */
  findByKey: async (key) => {
    const [rows] = await db.query('SELECT * FROM rules WHERE `key` = ? and (trim(value) <> "" and value is not null)', [key]);
    return rows[0];
  }
};

module.exports = Rule;
