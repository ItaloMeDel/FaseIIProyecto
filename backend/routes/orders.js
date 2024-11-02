const express = require('express');
const router = express.Router();
const db = require('../db/index');

router.get('/', async (req, res) => { // Mostrar pedidos
    try {
        const { rows } = await db.query('SELECT * FROM Orders');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => { // Crear pedido
    const { order_date, status, user_id, payment_method_id } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO Orders (order_date, status, user_id, payment_method_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [order_date, status, user_id, payment_method_id]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => { // Actualizar pedido
    const { id } = req.params;
    const { order_date, status, user_id, payment_method_id } = req.body;
    try {
        const { rowCount } = await db.query(
            'UPDATE Orders SET order_date = $1, status = $2, user_id = $3, payment_method_id = $4 WHERE order_id = $5',
            [order_date, status, user_id, payment_method_id, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => { // Eliminar pedido
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM Orders WHERE order_id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
