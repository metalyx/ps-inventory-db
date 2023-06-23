const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const Item = require('./models/Item');

const PORT = 5000;

dotenv.config();

const app = express();

app.use(express.json());

app.post('/items', async (req, res) => {
    try {
        const { price, inventory, nextDelivery, deliveryAmt, name } = req.body;

        const newItem = await Item.create({
            price,
            inventory,
            nextDelivery,
            deliveryAmt,
            name,
        });

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).json({
            message: 'Unexpected error',
        });
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();

        res.status(200).json(items);
    } catch (e) {
        res.status(500).json({
            message: 'Unexpected error',
        });
    }
});

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.wxmgrhj.mongodb.net/`
        );

        app.listen(PORT, () => {
            console.log(`App started on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();
