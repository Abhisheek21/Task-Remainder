const express = require('express');
const mysql = require('mysql2');
const router = express.Router();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


router.get('/', (req, res) => {
  pool.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { description } = req.body;
  pool.query(
    'INSERT INTO tasks (description) VALUES (?)',
    [description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, description, due_date: null, completed: false });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { due_date, completed } = req.body;
  pool.query(
    'UPDATE tasks SET due_date = ?, completed = ? WHERE id = ?',
    [due_date, completed, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id: Number(id), due_date, completed });
    }
  );
});

module.exports = router;