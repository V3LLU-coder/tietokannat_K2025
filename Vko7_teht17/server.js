const express = require('express');
const pool = require('./db'); 
require('dotenv').config();

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

//Book-taulukon CRUD-toiminnot
app.get('/books', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM book');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/books', async (req, res) => {
    try {
        const { name, author, isbn } = req.body;
        const [result] = await pool.query('INSERT INTO book (name, author, isbn) VALUES (?, ?, ?)', [name, author, isbn]);
        res.json({ id: result.insertId, name, author, isbn });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, author, isbn } = req.body;
        await pool.query('UPDATE book SET name=?, author=?, isbn=? WHERE id_book=?', [name, author, isbn, id]);
        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM book WHERE id_book=?', [id]);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Borrower-taulukon CRUD-toiminnot
app.get('/borrowers', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM borrower');
      res.json(rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.post('/borrowers', async (req, res) => {
  try {
      const { fname, lname, streetAddress } = req.body;
      const [result] = await pool.query('INSERT INTO borrower (fname, lname, streetAddress) VALUES (?, ?, ?)', [fname, lname, streetAddress]);
      res.json({ id: result.insertId, fname, lname, streetAddress });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.put('/borrowers/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { fname, lname, streetAddress } = req.body;
      await pool.query('UPDATE borrower SET fname=?, lname=?, streetAddress=? WHERE id_borrower=?', [fname, lname, streetAddress, id]);
      res.json({ message: 'Borrower updated successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.delete('/borrowers/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await pool.query('DELETE FROM borrower WHERE id_borrower=?', [id]);
      res.json({ message: 'Borrower deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
    console.log(`Palvelin käynnissä portissa ${PORT}`);
});
