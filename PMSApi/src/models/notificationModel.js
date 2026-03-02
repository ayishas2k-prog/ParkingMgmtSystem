const db = require('../config/db');

const Notification = {
  findByUserId: async (userId, onlyUnread = true) => {
    let query = 'SELECT * FROM Notifications WHERE UserId = ?';
    if (onlyUnread) {
      query += ' AND IsRead = false';
    }
    query += ' ORDER BY CreatedDateTime DESC';
    const [rows] = await db.query(query, [userId]);
    return rows;
  },

  updateReadStatus: async (id, userId, isRead) => {
    const [result] = await db.query(
      'UPDATE Notifications SET IsRead = ?, UpdatedDateTime = CURRENT_TIMESTAMP WHERE Id = ? AND UserId = ?',
      [isRead, id, userId]
    );
    return result.affectedRows;
  }
};

module.exports = Notification;
