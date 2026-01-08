const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./db/database'); // Veritabanını başlatır ve bağlantıyı kurar

// Rotaları içeri aktar
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templateRoutes');
const funnelRoutes = require('./routes/funnelRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Genel Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// API Rotaları
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/funnel', funnelRoutes);

// React Statik Dosyalarını Sunma (Production Modu)

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Genel Hata Yakalama (isteğe bağlı eklenebilir)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sunucuda bir hata oluştu!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});