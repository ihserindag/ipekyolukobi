const db = require('../db/database');
const { parseJSON } = require('../utils/jsonUtils'); // JSON yardımcı fonksiyonlarını merkezi bir yerden alacağız

const jsonFields = ['oncekiDestekler', 'yatirimPlani', 'cariDurum', 'iletisim', 'islemler', 'projeler'];
const parseCustomer = parseJSON(jsonFields);

const getFunnelAnalytics = (req, res) => {
    try {
        const stageCounts = db.prepare(`
            SELECT stage, COUNT(customer_id) as count
            FROM funnel_stages
            JOIN customers ON customers.id = funnel_stages.customer_id
            WHERE customers.is_archived = 0
            GROUP BY stage
        `).all();

        const counts = { 'Potansiyel': 0, 'Aktif': 0, 'Hedef': 0 };
        stageCounts.forEach(row => {
            counts[row.stage] = row.count;
        });

        const total = counts['Potansiyel'] + counts['Aktif'] + counts['Hedef'];

        res.json({
            stages: [
                { name: 'Potansiyel', value: counts['Potansiyel'] },
                { name: 'Aktif', value: counts['Aktif'] },
                { name: 'Hedef', value: counts['Hedef'] },
            ],
            totals: { total, ...counts },
        });
    } catch (error) {
        res.status(500).json({ message: 'Analytics verileri alınamadı', error: error.message });
    }
};

const getKanbanData = (req, res) => {
    try {
        const query = `
            SELECT
                c.*,
                fs.stage,
                fs.entered_date,
                fs.notes as stage_notes
            FROM customers c
            LEFT JOIN funnel_stages fs ON c.id = fs.customer_id
            WHERE c.is_archived = 0
            ORDER BY fs.entered_date DESC
        `;

        const rows = db.prepare(query).all();
        const customers = rows.map(parseCustomer);

        const kanban = {
            'Potansiyel': [],
            'Aktif': [],
            'Hedef': [],
            'Uncategorized': []
        };

        customers.forEach(customer => {
            if (kanban[customer.stage]) {
                kanban[customer.stage].push(customer);
            } else {
                kanban['Uncategorized'].push(customer);
            }
        });

        res.json(kanban);
    } catch (error) {
        res.status(500).json({ message: 'Kanban verileri alınamadı', error: error.message });
    }
};

const moveCustomerStage = (req, res) => {
    try {
        const { customerId, newStage } = req.body;

        if (!['Potansiyel', 'Aktif', 'Hedef'].includes(newStage)) {
            return res.status(400).json({ message: 'Geçersiz stage değeri' });
        }

        const existing = db.prepare('SELECT id FROM funnel_stages WHERE customer_id = ?').get(customerId);

        if (existing) {
            db.prepare('UPDATE funnel_stages SET stage = ?, entered_date = CURRENT_TIMESTAMP WHERE customer_id = ?')
                .run(newStage, customerId);
        } else {
            db.prepare('INSERT INTO funnel_stages (customer_id, stage) VALUES (?, ?)')
                .run(customerId, newStage);
        }
        
        const durumMap = { 'Potansiyel': 'potansiyel', 'Aktif': 'aktif', 'Hedef': 'hedef' };
        db.prepare('UPDATE customers SET durum = ? WHERE id = ?').run(durumMap[newStage], customerId);

        res.json({ success: true, customerId, newStage });
    } catch (error) {
        res.status(500).json({ message: 'Stage güncellenemedi', error: error.message });
    }
};

const updateStageNotes = (req, res) => {
    try {
        const { customerId, notes } = req.body;
        db.prepare('UPDATE funnel_stages SET notes = ? WHERE customer_id = ?').run(notes, customerId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Notlar güncellenemedi', error: error.message });
    }
};

module.exports = {
    getFunnelAnalytics,
    getKanbanData,
    moveCustomerStage,
    updateStageNotes,
};
