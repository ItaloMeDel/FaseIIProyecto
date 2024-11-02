const express = require('express');
const router = express.Router();
const db = require('../db/index'); 

router.get('/', async (req, res) => { // Mostrar usuarios
    try {
        const { rows } = await db.query('SELECT * FROM Users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

¿
router.post('/', async (req, res) => { // Crear usuario
    const { name, email, address, phone, password } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO Users (name, email, address, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, address, phone, password]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => { // Actualizar usuario
    const { id } = req.params;
    const { name, email, address, phone, password } = req.body;
    try {
        const { rowCount } = await db.query(
            'UPDATE Users SET name = $1, email = $2, address = $3, phone = $4, password = $5 WHERE user_id = $6',
            [name, email, address, phone, password, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => { // Eliminar usuario
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM Users WHERE user_id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
