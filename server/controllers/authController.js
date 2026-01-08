const { getDatabase } = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'kobi-crm-gizli-anahtar'; // Bunu merkezi bir konfigürasyon dosyasına taşımak daha iyi olur

const login = (req, res) => {
    const { username, password } = req.body;
    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role,
            fullName: user.fullName,
            customer_id: user.customer_id,
            permissions: user.permissions ? JSON.parse(user.permissions) : null
        }, SECRET_KEY, { expiresIn: '8h' });
        res.json({
            token,
            user: {
                username: user.username,
                role: user.role,
                fullName: user.fullName,
                customer_id: user.customer_id,
                permissions: user.permissions ? JSON.parse(user.permissions) : null
            }
        });
    } else {
        res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
};

const getMe = (req, res) => {
    res.json(req.user);
};

module.exports = {
    login,
    getMe,
};
