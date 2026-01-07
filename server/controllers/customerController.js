const db = require('../db/database');
const { parseJSON, stringifyJSON } = require('../utils/jsonUtils');

const jsonFields = ['oncekiDestekler', 'yatirimPlani', 'cariDurum', 'iletisim', 'islemler', 'projeler'];
const parseCustomer = parseJSON(jsonFields);
const stringifyCustomer = stringifyJSON(jsonFields);


const getAllCustomers = (req, res) => {
    let query = 'SELECT * FROM customers WHERE is_archived = 0';
    let params = [];

    if (req.user.role !== 'admin') {
        if (req.user.customer_id) {
            query += ' AND id = ?';
            params.push(req.user.customer_id);
        } else {
            return res.json([]);
        }
    }

    try {
        const rows = db.prepare(query).all(...params);
        const parsedRows = rows.map(parseCustomer);
        res.json(parsedRows);
    } catch (error) {
        res.status(500).json({ message: 'Müşteriler alınamadı', error: error.message });
    }
};

const getArchivedCustomers = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM customers WHERE is_archived = 1').all();
        const parsedRows = rows.map(parseCustomer);
        res.json(parsedRows);
    } catch (error) {
        res.status(500).json({ message: 'Arşivlenmiş müşteriler alınamadı', error: error.message });
    }
};

const createCustomer = (req, res) => {
    try {
        const customer = stringifyCustomer(req.body);
        const info = db.prepare(`
            INSERT INTO customers (
                firmaAdi, naceKodu, faaliyetKonusu, kurulusYili, sonYilCiro, calisanSayisi,
                adres, oncekiDestekler, yetkiliAdi, vergiNo, yetkiliTC, oda,
                yatirimPlani, cariDurum, ekAciklamalar, iletisim, durum, islemler, projeler, yetkiliSifre
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            customer.firmaAdi, customer.naceKodu, customer.faaliyetKonusu, customer.kurulusYili,
            customer.sonYilCiro, customer.calisanSayisi, customer.adres, customer.oncekiDestekler,
            customer.yetkiliAdi, customer.vergiNo, customer.yetkiliTC, customer.oda,
            customer.yatirimPlani, customer.cariDurum, customer.ekAciklamalar, customer.iletisim,
            customer.durum, customer.islemler, customer.projeler, customer.yetkiliSifre
        );
         // Yeni müşteri için bir funnel stage oluştur
        db.prepare('INSERT INTO funnel_stages (customer_id, stage) VALUES (?, ?)')
          .run(info.lastInsertRowid, 'Potansiyel');

        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ message: 'Müşteri oluşturulamadı', error: error.message });
    }
};

const updateCustomer = (req, res) => {
    const { id } = req.params;
    try {
        const customer = stringifyCustomer(req.body);
        db.prepare(`
            UPDATE customers SET
            firmaAdi = ?, naceKodu = ?, faaliyetKonusu = ?, kurulusYili = ?, sonYilCiro = ?,
            calisanSayisi = ?, adres = ?, oncekiDestekler = ?, yetkiliAdi = ?, vergiNo = ?,
            yetkiliTC = ?, oda = ?, yatirimPlani = ?, cariDurum = ?, ekAciklamalar = ?,
            iletisim = ?, durum = ?, islemler = ?, projeler = ?, yetkiliSifre = ?
            WHERE id = ?
        `).run(
            customer.firmaAdi, customer.naceKodu, customer.faaliyetKonusu, customer.kurulusYili,
            customer.sonYilCiro, customer.calisanSayisi, customer.adres, customer.oncekiDestekler,
            customer.yetkiliAdi, customer.vergiNo, customer.yetkiliTC, customer.oda,
            customer.yatirimPlani, customer.cariDurum, customer.ekAciklamalar, customer.iletisim,
            customer.durum, customer.islemler, customer.projeler, customer.yetkiliSifre, id
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Müşteri güncellenemedi', error: error.message });
    }
};

const archiveCustomer = (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('UPDATE customers SET is_archived = 1 WHERE id = ?').run(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Müşteri arşivlenemedi', error: error.message });
    }
};

const restoreCustomer = (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('UPDATE customers SET is_archived = 0 WHERE id = ?').run(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Müşteri geri yüklenemedi', error: error.message });
    }
};

module.exports = {
    getAllCustomers,
    getArchivedCustomers,
    createCustomer,
    updateCustomer,
    archiveCustomer,
    restoreCustomer,
};
