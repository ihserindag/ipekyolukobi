const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Veritabanı dosya yolu
// Veritabanı dosya yolu - Persistent volume için /app/data veya proje kökünde data klasörü
const dbPath = process.env.DB_PATH || path.join(__dirname, '..', '..', 'data', 'database.db');

// Data klasörünün varlığını kontrol et ve yoksa oluştur
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    try {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('Created database directory:', dbDir);
    } catch (err) {
        console.error('Error creating database directory:', err);
    }
}

let db = null;
let isReady = false;
let readyPromise = null;

// Veritabanını hazırla
async function initDatabase() {
    if (readyPromise) return readyPromise;
    
    readyPromise = (async () => {
        try {
            const SQL = await initSqlJs();
            
            // Mevcut veritabanı varsa yükle
            if (fs.existsSync(dbPath)) {
                const buffer = fs.readFileSync(dbPath);
                db = new SQL.Database(buffer);
                console.log('Existing database loaded from:', dbPath);
            } else {
                db = new SQL.Database();
                console.log('New database created');
            }
            
            initializeTables();
            seedInitialData();
            saveDatabase();
            
            isReady = true;
            return db;
        } catch (error) {
            console.error('Database initialization error:', error);
            throw error;
        }
    })();
    
    return readyPromise;
}

// Veritabanını diske kaydet
function saveDatabase() {
    if (!db) return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
}

// Tabloları oluştur
function initializeTables() {
    db.run(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firmaAdi TEXT,
        naceKodu TEXT,
        faaliyetKonusu TEXT,
        kurulusYili INTEGER,
        sonYilCiro INTEGER,
        calisanSayisi INTEGER,
        adres TEXT,
        oncekiDestekler TEXT,
        yetkiliAdi TEXT,
        vergiNo TEXT,
        yetkiliTC TEXT,
        oda TEXT,
        yatirimPlani TEXT,
        cariDurum TEXT,
        ekAciklamalar TEXT,
        iletisim TEXT,
        durum TEXT,
        islemler TEXT,
        projeler TEXT,
        yetkiliSifre TEXT,
        is_archived INTEGER DEFAULT 0
    );
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        fullName TEXT,
        customer_id INTEGER,
        permissions TEXT
    );
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS project_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        stages TEXT
    );
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS funnel_stages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        stage TEXT NOT NULL,
        entered_date TEXT DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
    `);

    // Kolonları programatik olarak ekle (mevcut veriler için) - Hata yoksay
    try { db.run('ALTER TABLE customers ADD COLUMN is_archived INTEGER DEFAULT 0'); } catch (e) { /* no-op */ }
    try { db.run('ALTER TABLE users ADD COLUMN customer_id INTEGER'); } catch (e) { /* no-op */ }
    try { db.run('ALTER TABLE users ADD COLUMN permissions TEXT'); } catch (e) { /* no-op */ }
}

function seedInitialData() {
    seedCustomers();
    seedUsers();
    seedProjectTemplates();
    seedFunnelStages();
}

function seedCustomers() {
    const result = db.exec('SELECT COUNT(*) as count FROM customers');
    const customerCount = result.length > 0 ? result[0].values[0][0] : 0;
    
    if (customerCount === 0) {
        const initialCustomers = [
            {
                id: 1, firmaAdi: 'Tekno Yazılım A.Ş.', naceKodu: '62.01', faaliyetKonusu: 'Yazılım Geliştirme',
                kurulusYili: 2015, sonYilCiro: 5000000, calisanSayisi: 25, adres: 'Ankara, Çankaya',
                oncekiDestekler: ['KOSGEB', 'TÜBİTAK'], yetkiliAdi: 'Ahmet Yılmaz', vergiNo: '1234567890',
                yetkiliTC: '12345678901', oda: 'Ankara Ticaret Odası',
                yatirimPlani: { personel: true, makina: true, hizmet: false },
                cariDurum: { toplamBorc: 15000, gecmisBorc: 5000, tahsilEdilen: 10000 },
                ekAciklamalar: 'KOSGEB başvurusu devam ediyor',
                iletisim: { telefon: '0312 123 4567', email: 'info@teknoyazilim.com', whatsapp: '05321234567' },
                durum: 'aktif',
                islemler: [
                    { tarih: '2024-01-15', islem: 'İlk görüşme yapıldı', tip: 'gorusme' },
                    { tarih: '2024-01-20', islem: 'KOSGEB başvurusu hazırlandı', tip: 'basvuru' },
                    { tarih: '2024-02-10', islem: 'Danışmanlık ücreti tahsil edildi', tip: 'odeme' }
                ],
                projeler: [{
                    id: 1, projeAdi: 'Yazılım Ar-Ge Projesi', programTuru: 'KOBİGEL',
                    baslangicTarihi: '2024-01-10', tahminiButce: 500000, durum: 'devam',
                    anlasma: { bedel: 15000, tarih: '2024-01-10', aciklama: 'KOBİGEL danışmanlık hizmeti' },
                    odemeler: [
                        { id: 1, aciklama: 'Ön Ödeme (Sözleşme)', tutar: 5000, vadeTarihi: '2024-01-15', tahsilatTarihi: '2024-01-15', durum: 'tahsil' },
                        { id: 2, aciklama: '2. Ödeme (Başvuru Sonrası)', tutar: 5000, vadeTarihi: '2024-02-15', tahsilatTarihi: '2024-02-10', durum: 'tahsil' },
                        { id: 3, aciklama: '3. Ödeme (Onay Sonrası)', tutar: 5000, vadeTarihi: '2024-12-25', tahsilatTarihi: '', durum: 'bekliyor' }
                    ],
                    asamalar: [
                        { asamaNo: 1, baslik: 'Ön Değerlendirme', tamamlandi: true, planlananTarih: '2024-01-15', gerceklesenTarih: '2024-01-10', notlar: 'Firma uygun bulundu' },
                        { asamaNo: 2, baslik: 'Evrak Hazırlığı', tamamlandi: true, planlananTarih: '2024-01-25', gerceklesenTarih: '2024-01-20', notlar: 'Tüm evraklar toplandı' },
                        { asamaNo: 3, baslik: 'Proje Yazımı', tamamlandi: true, planlananTarih: '2024-02-10', gerceklesenTarih: '2024-02-05', notlar: 'Proje dokümanı hazır' },
                        { asamaNo: 4, baslik: 'Bütçe Planlaması', tamamlandi: true, planlananTarih: '2024-02-15', gerceklesenTarih: '2024-02-12', notlar: '500K bütçe onaylandı' },
                        { asamaNo: 5, baslik: 'Online Başvuru', tamamlandi: true, planlananTarih: '2024-02-20', gerceklesenTarih: '2024-02-18', notlar: 'Başvuru no: KBG-2024-1234' },
                        { asamaNo: 6, baslik: 'Evrak Teslimi', tamamlandi: true, planlananTarih: '2024-02-25', gerceklesenTarih: '2024-02-22', notlar: 'KOSGEB\'e teslim edildi' },
                        { asamaNo: 7, baslik: 'Ön İnceleme', tamamlandi: false, planlananTarih: '2024-12-22', gerceklesenTarih: '', notlar: 'Bekleniyor' },
                        { asamaNo: 8, baslik: 'Kurul Değerlendirme', tamamlandi: false, planlananTarih: '2025-01-15', gerceklesenTarih: '', notlar: '' },
                        { asamaNo: 9, baslik: 'Sözleşme', tamamlandi: false, planlananTarih: '2025-02-01', gerceklesenTarih: '', notlar: '' },
                        { asamaNo: 10, baslik: 'Uygulama & Ödeme', tamamlandi: false, planlananTarih: '2025-08-01', gerceklesenTarih: '', notlar: '' }
                    ]
                }]
            }
        ];
        
        initialCustomers.forEach(c => {
            db.run(`
                INSERT INTO customers (
                firmaAdi, naceKodu, faaliyetKonusu, kurulusYili, sonYilCiro, calisanSayisi,
                adres, oncekiDestekler, yetkiliAdi, vergiNo, yetkiliTC, oda,
                yatirimPlani, cariDurum, ekAciklamalar, iletisim, durum, islemler, projeler, yetkiliSifre, is_archived
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                c.firmaAdi, c.naceKodu, c.faaliyetKonusu, c.kurulusYili, c.sonYilCiro, c.calisanSayisi,
                c.adres, JSON.stringify(c.oncekiDestekler), c.yetkiliAdi, c.vergiNo, c.yetkiliTC, c.oda,
                JSON.stringify(c.yatirimPlani), JSON.stringify(c.cariDurum), c.ekAciklamalar,
                JSON.stringify(c.iletisim), c.durum, JSON.stringify(c.islemler), JSON.stringify(c.projeler), '', 0
            ]);
        });
    }
}

function seedUsers() {
    const result = db.exec('SELECT COUNT(*) as count FROM users');
    const userCount = result.length > 0 ? result[0].values[0][0] : 0;
    
    if (userCount === 0) {
        const adminPassword = bcrypt.hashSync('admin123', 10);
        const userPassword = bcrypt.hashSync('user123', 10);
        db.run('INSERT INTO users (username, password, role, fullName) VALUES (?, ?, ?, ?)', ['admin', adminPassword, 'admin', 'Sistem Yöneticisi']);
        db.run('INSERT INTO users (username, password, role, fullName) VALUES (?, ?, ?, ?)', ['user', userPassword, 'user', 'Standart Kullanıcı']);
    }
}

function seedProjectTemplates() {
    const result = db.exec('SELECT COUNT(*) as count FROM project_templates');
    const templateCount = result.length > 0 ? result[0].values[0][0] : 0;
    
    if (templateCount === 0) {
        const defaultTemplates = {
            'KOBİGEL': [
                { baslik: 'Ön Değerlendirme', sure: 3 }, { baslik: 'Evrak Hazırlığı', sure: 7 },
                { baslik: 'Proje Yazımı', sure: 14 }, { baslik: 'Bütçe Planlaması', sure: 5 },
                { baslik: 'Online Başvuru', sure: 2 }, { baslik: 'Evrak Teslimi', sure: 3 },
                { baslik: 'Ön İnceleme', sure: 30 }, { baslik: 'Kurul Değerlendirme', sure: 45 },
                { baslik: 'Sözleşme', sure: 15 }, { baslik: 'Uygulama & Ödeme', sure: 180 }
            ],
            'KOSGEB Genel': [
                { baslik: 'KOBİ Beyanı', sure: 2 }, { baslik: 'Evrak Hazırlığı', sure: 5 },
                { baslik: 'Online Başvuru', sure: 1 }, { baslik: 'Değerlendirme', sure: 15 },
                { baslik: 'Onay', sure: 10 }, { baslik: 'Ödeme', sure: 30 }
            ],
            'TÜBİTAK TEYDEB': [
                { baslik: 'Ön Görüşme', sure: 7 }, { baslik: 'Proje Fikri Geliştirme', sure: 14 },
                { baslik: 'AGY300 Formu', sure: 21 }, { baslik: 'Bütçe Detaylandırma', sure: 7 },
                { baslik: 'Online Başvuru', sure: 3 }, { baslik: 'Hakem Değerlendirme', sure: 60 },
                { baslik: 'Komite Kararı', sure: 30 }, { baslik: 'Sözleşme', sure: 15 },
                { baslik: 'Dönem Raporları', sure: 180 }, { baslik: 'Sonuç Raporu', sure: 30 }
            ],
            'IPARD': [
                { baslik: 'Uygunluk Kontrolü', sure: 5 }, { baslik: 'Yatırım Planı', sure: 14 },
                { baslik: 'Teknik Proje', sure: 30 }, { baslik: 'Çevresel Etki', sure: 45 },
                { baslik: 'Online Başvuru', sure: 3 }, { baslik: 'İdari Kontrol', sure: 30 },
                { baslik: 'Yerinde Kontrol', sure: 15 }, { baslik: 'Onay & Sözleşme', sure: 20 },
                { baslik: 'Uygulama', sure: 365 }, { baslik: 'Ödeme Talebi', sure: 60 }
            ],
            'Kalkınma Ajansı': [
                { baslik: 'Teklif Çağrısı', sure: 7 }, { baslik: 'Proje Fikri', sure: 10 },
                { baslik: 'Başvuru Formu', sure: 14 }, { baslik: 'Bütçe Hazırlama', sure: 7 },
                { baslik: 'Ekler Hazırlama', sure: 7 }, { baslik: 'Online Başvuru', sure: 2 },
                { baslik: 'Ön İnceleme', sure: 30 }, { baslik: 'Değerlendirme', sure: 45 },
                { baslik: 'Sözleşme', sure: 20 }, { baslik: 'Uygulama', sure: 365 }
            ],
            'Özel': [
                { baslik: 'Aşama 1', sure: 7 }, { baslik: 'Aşama 2', sure: 7 },
                { baslik: 'Aşama 3', sure: 7 }, { baslik: 'Aşama 4', sure: 7 }, { baslik: 'Aşama 5', sure: 7 }
            ]
        };
        
        Object.entries(defaultTemplates).forEach(([name, stages]) => {
            db.run('INSERT INTO project_templates (name, stages) VALUES (?, ?)', [name, JSON.stringify(stages)]);
        });
    }
}

function seedFunnelStages() {
    const result = db.exec('SELECT COUNT(*) as count FROM funnel_stages');
    const funnelCount = result.length > 0 ? result[0].values[0][0] : 0;
    
    if (funnelCount === 0) {
        const customersResult = db.exec('SELECT id, durum FROM customers');
        if (customersResult.length > 0) {
            const columns = customersResult[0].columns;
            const values = customersResult[0].values;
            values.forEach(row => {
                const customer = {};
                columns.forEach((col, i) => customer[col] = row[i]);
                
                let stage = 'Potansiyel';
                if (customer.durum === 'aktif') stage = 'Aktif';
                else if (customer.durum === 'hedef') stage = 'Hedef';
                db.run('INSERT INTO funnel_stages (customer_id, stage, notes) VALUES (?, ?, ?)', 
                    [customer.id, stage, 'Mevcut sistem verilerinden otomatik eklendi']);
            });
        }
    }
}

// Helper fonksiyonlar - better-sqlite3 uyumlu API sağlar
function getDatabase() {
    if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
    return {
        // Tek satır döndür
        prepare: (sql) => ({
            get: (...params) => {
                const result = db.exec(sql, params);
                if (result.length === 0) return undefined;
                const columns = result[0].columns;
                const values = result[0].values[0];
                if (!values) return undefined;
                const row = {};
                columns.forEach((col, i) => row[col] = values[i]);
                return row;
            },
            all: (...params) => {
                const result = db.exec(sql, params);
                if (result.length === 0) return [];
                const columns = result[0].columns;
                return result[0].values.map(values => {
                    const row = {};
                    columns.forEach((col, i) => row[col] = values[i]);
                    return row;
                });
            },
            run: (...params) => {
                db.run(sql, params);
                saveDatabase();
                return { 
                    changes: db.getRowsModified(),
                    lastInsertRowid: getLastInsertRowId()
                };
            }
        }),
        exec: (sql) => {
            db.run(sql);
            saveDatabase();
        }
    };
}

function getLastInsertRowId() {
    const result = db.exec('SELECT last_insert_rowid() as id');
    return result.length > 0 ? result[0].values[0][0] : 0;
}

// Module exports
module.exports = {
    initDatabase,
    getDatabase,
    saveDatabase,
    isReady: () => isReady
};
