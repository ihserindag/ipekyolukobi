const db = require('../db/database');

const getAllTemplates = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM project_templates').all();
        const parsedRows = rows.map(row => ({
            ...row,
            stages: JSON.parse(row.stages)
        }));
        res.json(parsedRows);
    } catch (error) {
        res.status(500).json({ message: 'Şablonlar alınamadı', error: error.message });
    }
};

const createTemplate = (req, res) => {
    const { name, stages } = req.body;
    try {
        const info = db.prepare('INSERT INTO project_templates (name, stages) VALUES (?, ?)').run(name, JSON.stringify(stages));
        res.status(201).json({ id: info.lastInsertRowid, name, stages });
    } catch (error) {
        res.status(400).json({ message: 'Şablon eklenemedi, isim benzersiz olmalı.' });
    }
};

const deleteTemplate = (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('DELETE FROM project_templates WHERE id = ?').run(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Şablon silinemedi.', error: error.message });
    }
};

module.exports = {
    getAllTemplates,
    createTemplate,
    deleteTemplate,
};
