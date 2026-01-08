const sqlite = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

// Veritabanı bağlantısı
const dbPath = path.join(__dirname, '..', 'database.db');
let db;
try {
    db = sqlite(dbPath);
} catch (error) {
    console.error(`Failed to connect to database at ${dbPath}:`, error);
    throw error;
}

function initializeDatabase() {
    // Tablo oluşturma
    db.exec(`
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

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        fullName TEXT,
        customer_id INTEGER,
        permissions TEXT
    );

    CREATE TABLE IF NOT EXISTS project_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        stages TEXT
    );

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
    try { db.prepare('ALTER TABLE customers ADD COLUMN is_archived INTEGER DEFAULT 0').run(); } catch (e) { /* no-op */ }
    try { db.prepare('ALTER TABLE users ADD COLUMN customer_id INTEGER').run(); } catch (e) { /* no-op */ }
    try { db.prepare('ALTER TABLE users ADD COLUMN permissions TEXT').run(); } catch (e) { /* no-op */ }


    // Başlangıç verilerini ekle (eğer tablolar boşsa)
    seedInitialData();
}

function seedInitialData() {
    seedCustomers();
    seedUsers();
    seedProjectTemplates();
    seedFunnelStages();
}

function seedCustomers() {
    const customerCount = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
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
        const insert = db.prepare(`
            INSERT INTO customers (
            firmaAdi, naceKodu, faaliyetKonusu, kurulusYili, sonYilCiro, calisanSayisi,
            adres, oncekiDestekler, yetkiliAdi, vergiNo, yetkiliTC, oda,
            yatirimPlani, cariDurum, ekAciklamalar, iletisim, durum, islemler, projeler, yetkiliSifre, is_archived
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        initialCustomers.forEach(c => {
            insert.run(
                c.firmaAdi, c.naceKodu, c.faaliyetKonusu, c.kurulusYili, c.sonYilCiro, c.calisanSayisi,
                c.adres, JSON.stringify(c.oncekiDestekler), c.yetkiliAdi, c.vergiNo, c.yetkiliTC, c.oda,
                JSON.stringify(c.yatirimPlani), JSON.stringify(c.cariDurum), c.ekAciklamalar,
                JSON.stringify(c.iletisim), c.durum, JSON.stringify(c.islemler), JSON.stringify(c.projeler), '', 0
            );
        });
    }
}

function seedUsers() {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    if (userCount === 0) {
        const adminPassword = bcrypt.hashSync('admin123', 10);
        const userPassword = bcrypt.hashSync('user123', 10);
        db.prepare('INSERT INTO users (username, password, role, fullName) VALUES (?, ?, ?, ?)').run('admin', adminPassword, 'admin', 'Sistem Yöneticisi');
        db.prepare('INSERT INTO users (username, password, role, fullName) VALUES (?, ?, ?, ?)').run('user', userPassword, 'user', 'Standart Kullanıcı');
    }
}

function seedProjectTemplates() {
    const templateCount = db.prepare('SELECT COUNT(*) as count FROM project_templates').get().count;
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
        const insertTemplate = db.prepare('INSERT INTO project_templates (name, stages) VALUES (?, ?)');
        Object.entries(defaultTemplates).forEach(([name, stages]) => {
            insertTemplate.run(name, JSON.stringify(stages));
        });
    }
}

function seedFunnelStages() {
    const funnelCount = db.prepare('SELECT COUNT(*) as count FROM funnel_stages').get().count;
    if (funnelCount === 0) {
        const customers = db.prepare('SELECT id, durum FROM customers').all();
        const insertStage = db.prepare('INSERT INTO funnel_stages (customer_id, stage, notes) VALUES (?, ?, ?)');
        customers.forEach(customer => {
            let stage = 'Potansiyel'; // Default
            if (customer.durum === 'aktif') stage = 'Aktif';
            else if (customer.durum === 'hedef') stage = 'Hedef';
            insertStage.run(customer.id, stage, 'Mevcut sistem verilerinden otomatik eklendi');
        });
    }
}

// Veritabanını başlat
initializeDatabase();

// db örneğini dışa aktar
module.exports = db;
