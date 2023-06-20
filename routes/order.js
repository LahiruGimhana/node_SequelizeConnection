const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Customer = require('../models/customer');

// GET all orders
router.get('/', (req, res) => {
    Order.findAll()
        .then(orders => {
            return res.json(orders)
        })
        .catch(err => res.status(500).json({ error: err.message, stack: err.stack }));
});

// POST a new order
router.post('/', (req, res) => {
    const { customerId, total } = req.body;
    Order.create({ customerId, total })
        .then(orders => {
            return res.json(orders)
        })
        .catch(err => res.status(500).json({ error: err.message, stack: err.stack }));
});

module.exports = router;
