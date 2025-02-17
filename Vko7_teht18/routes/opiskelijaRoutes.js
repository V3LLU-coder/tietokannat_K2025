const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM opiskelija');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { Etunimi, Sukunimi, Osoite, Luokkatunnus } = req.body;
    await db.query('INSERT INTO opiskelija (Etunimi, Sukunimi, Osoite, Luokkatunnus) VALUES (?, ?, ?, ?)', 
      [Etunimi, Sukunimi, Osoite, Luokkatunnus]);
    res.status(201).json({ message: "Opiskelija lisätty!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { Etunimi, Sukunimi, Osoite, Luokkatunnus } = req.body;
    await db.query('UPDATE opiskelija SET Etunimi=?, Sukunimi=?, Osoite=?, Luokkatunnus=? WHERE idOpiskelija=?', 
      [Etunimi, Sukunimi, Osoite, Luokkatunnus, req.params.id]);
    res.json({ message: "Opiskelija päivitetty!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM opiskelija WHERE idOpiskelija=?', [req.params.id]);
    res.json({ message: "Opiskelija poistettu!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
