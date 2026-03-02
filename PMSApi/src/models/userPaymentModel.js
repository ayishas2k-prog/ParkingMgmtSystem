const db = require('../config/db');

const UserPayment = {
  findByUserId: async (userId, onlyPending = true) => {
    let query = `SELECT up.*, vi.VehicleNumber, vi.Make, vi.Model 
                 FROM User_Payments up
                 JOIN vehicle_info vi ON up.VehicleId = vi.id
                 WHERE up.UserId = ?`;
    if (onlyPending) {
      query += ' AND up.IsSuccess = false';
    }
    query += ' ORDER BY up.CreatedDateTime DESC';
    const [rows] = await db.query(query, [userId]);
    return rows;
  },

  update: async (id, userId, data) => {
    const [result] = await db.query(
      'UPDATE User_Payments SET ?, UpdatedDateTime = CURRENT_TIMESTAMP WHERE id = ? AND UserId = ?',
      [data, id, userId]
    );
    return result.affectedRows;
  }
};

module.exports = UserPayment;
