const express = require('express');
const router = express.Router();
const db = require('../db/index'); 

router.get('/', async (req, res) => { // Obtener libros
  try {
    const result = await pool.query('SELECT * FROM Books');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => { // Crear libro
  const { title, isbn, price, stock, publisher, publication_date, author_id, category_id } = req.body;
  try {
    const newBook = await pool.query(
      'INSERT INTO Books (title, isbn, price, stock, publisher, publication_date, author_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, isbn, price, stock, publisher, publication_date, author_id, category_id]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => { // Actualizar libro
    const { id } = req.params;
    const { title, isbn, price, stock, publisher, publication_date, author_id, category_id } = req.body;
    try {
        const { rowCount } = await db.query(
            'UPDATE Books SET title = $1, isbn = $2, price = $3, stock = $4, publisher = $5, publication_date = $6, author_id = $7, category_id = $8 WHERE book_id = $9',
            [title, isbn, price, stock, publisher, publication_date, author_id, category_id, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        res.json({ message: 'Libro actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => { // Eliminar libro
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM Books WHERE book_id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        res.json({ message: 'Libro eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;