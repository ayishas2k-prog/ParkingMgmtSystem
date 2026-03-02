const db = require('../config/db');

const UserVehicle = {
  create: async (userId, vehicleId) => {
    const [result] = await db.query('INSERT INTO User_Vehicles (UserId, VehicleId) VALUES (?, ?)', [userId, vehicleId]);
    return result.insertId;
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query(
      `SELECT vi.* FROM vehicle_info vi
       JOIN User_Vehicles uv ON vi.id = uv.VehicleId
       WHERE uv.UserId = ?`,
      [userId]
    );
    return rows;
  },

  findByUserIdAndVehicleId: async (userId, vehicleId) => {
    const [rows] = await db.query(
      `SELECT vi.* FROM vehicle_info vi
       JOIN User_Vehicles uv ON vi.id = uv.VehicleId
       WHERE uv.UserId = ? AND vi.id = ?`,
      [userId, vehicleId]
    );
    return rows[0];
  },

  delete: async (userId, vehicleId) => {
    const [result] = await db.query('DELETE FROM User_Vehicles WHERE UserId = ? AND VehicleId = ?', [userId, vehicleId]);
    return result.affectedRows;
  },

  getLastParkingInfo: async (userId, vehicleId) => {
    const [rows] = await db.query(
      `SELECT vio.* FROM vehicle_inout vio
       JOIN vehicle_info vi ON vio.VehicleNumber = vi.VehicleNumber
       JOIN User_Vehicles uv ON vi.id = uv.VehicleId
       WHERE uv.UserId = ? AND vi.id = ?
       ORDER BY vio.InTime DESC
       LIMIT 1`,
      [userId, vehicleId]
    );
    return rows[0];
  }
};

module.exports = UserVehicle;
