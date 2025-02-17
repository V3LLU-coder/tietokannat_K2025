const express = require('express');
const router = express.Router();
const pool = require('../db'); 


router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT a.idOpintojakso, o.Nimi AS Opintojakso, a.idOpiskelija, 
                   CONCAT(s.Etunimi, ' ', s.Sukunimi) AS Opiskelija, 
                   a.Arvosana, a.Paivamaara 
            FROM arviointi a
            JOIN opintojakso o ON a.idOpintojakso = o.idOpintojakso
            JOIN opiskelija s ON a.idOpiskelija = s.idOpiskelija
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/opiskelija/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM arviointi WHERE idOpiskelija = ?', [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    const { idOpintojakso, idOpiskelija, Arvosana, Paivamaara } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO arviointi (idOpintojakso, idOpiskelija, Arvosana, Paivamaara) VALUES (?, ?, ?, ?)',
            [idOpintojakso, idOpiskelija, Arvosana, Paivamaara]
        );
        res.status(201).json({ message: "Arviointi lisätty onnistuneesti" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:idOpintojakso/:idOpiskelija', async (req, res) => {
    const { Arvosana, Paivamaara } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE arviointi SET Arvosana = ?, Paivamaara = ? WHERE idOpintojakso = ? AND idOpiskelija = ?',
            [Arvosana, Paivamaara, req.params.idOpintojakso, req.params.idOpiskelija]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Arviointia ei loydy" });
        res.json({ message: "Arviointi paivitetty onnistuneesti" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:idOpintojakso/:idOpiskelija', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM arviointi WHERE idOpintojakso = ? AND idOpiskelija = ?',
            [req.params.idOpintojakso, req.params.idOpiskelija]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Arviointia ei loydy" });
        res.json({ message: "Arviointi poistettu onnistuneesti" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
