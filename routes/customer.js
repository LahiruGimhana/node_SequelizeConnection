const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Order = require('../models/order');
const { Op } = require('sequelize');

// GET all customers
router.get('/', (req, res) => {
    Customer.findAll()
        .then(customers => {
            return res.json(customers)
        })
        .catch(err => res.status(500).json({ error: err.message, stack: err.stack }));
});

// POST a new customer
router.post('/', (req, res) => {
    const { name, email } = req.body;
    Customer.create({ name, email })
        .then(customer => {
            return res.json(customer)
        })
        .catch(err => res.status(500).json({ error: err.message, stack: err.stack }));
});


// GET customer by name
router.get('/:customerName', async (req, res) => {
    const { customerName } = req.params;

    try
    {
        const customer = await Customer.findOne({
            where: { name: customerName }
        });

        if (!customer)
        {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.get('/order/:customerName', async (req, res) => {
    // const { customerName } = req.params;

    // try
    // {
    //     const customer = await Customer.findOne({
    //         where: { name: customerName },
    //         include: [Order],
    //     });

    //     if (!customer)
    //     {
    //         return res.status(404).json({ message: 'Customer not found' });
    //     }

    //     res.status(200).json(customer);
    // } catch (error)
    // {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal Server Error' });
    // }

    const customerName = req.params.customerName;

    Customer.findOne({
        where: { name: { [Op.iLike]: `%${customerName}%` } },
        include: Order,
    })
        .then(customer => {
            if (customer)
            {
                res.json(customer);
            } else
            {
                res.status(404).json({ error: 'Customer not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error retrieving customer and orders' });
        });
});
module.exports = router;
