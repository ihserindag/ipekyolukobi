const jwt = require('jsonwebtoken');
const SECRET_KEY = 'kobi-crm-gizli-anahtar'; // Bunu merkezi bir konfigürasyon dosyasına taşımak daha iyi olur

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Yetkisiz erişim' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Geçersiz token' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }
};

module.exports = {
    authenticateToken,
    isAdmin
};
