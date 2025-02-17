const express = require('express');
const router = express.Router();
const pool = require('../db'); 


router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM opintojakso');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM opintojakso WHERE idOpintojakso = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Opintojaksoa ei löydy" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    const { Koodi, Laajuus, Nimi } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO opintojakso (Koodi, Laajuus, Nimi) VALUES (?, ?, ?)',
            [Koodi, Laajuus, Nimi]
        );
        res.status(201).json({ id: result.insertId, Koodi, Laajuus, Nimi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { Koodi, Laajuus, Nimi } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE opintojakso SET Koodi = ?, Laajuus = ?, Nimi = ? WHERE idOpintojakso = ?',
            [Koodi, Laajuus, Nimi, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Opintojaksoa ei loydy" });
        res.json({ message: "Opintojakso paivitetty onnistuneesti" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM opintojakso WHERE idOpintojakso = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Opintojaksoa ei loydy" });
        res.json({ message: "Opintojakso poistettu onnistuneesti" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
