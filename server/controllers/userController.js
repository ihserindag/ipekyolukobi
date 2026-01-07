const db = require('../db/database');

const getAllUsers = (req, res) => {
    try {
        const rows = db.prepare('SELECT id, username, role, fullName, customer_id, permissions FROM users').all();
        const parsedRows = rows.map(row => ({
            ...row,
            permissions: row.permissions ? JSON.parse(row.permissions) : null
        }));
        res.json(parsedRows);
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcılar alınamadı', error: error.message });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { customer_id, permissions, fullName } = req.body;
    try {
        db.prepare('UPDATE users SET customer_id = ?, permissions = ?, fullName = ? WHERE id = ?')
            .run(customer_id, JSON.stringify(permissions), fullName, id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı güncellenemedi', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    updateUser,
};
