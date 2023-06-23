const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const Item = require('./models/Item');
const Veggie = require('./models/Veggie');
const cors = require('cors');

const PORT = 5000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/create_veggie', async (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        return res.status(400).json({
            message: 'No name or color was provided',
        });
    }

    try {
        const veggie = await Veggie.create({
            name,
            color,
        });

        res.status(201).json(veggie);
    } catch (e) {
        res.status(500).json({
            message: 'Error occured when trying to create new Veggie',
        });
    }
});
app.get('/veggies', async (req, res) => {
    try {
        const veggies = await Veggie.find();

        res.status(200).json(veggies);
    } catch (e) {
        res.status(500).json({
            message: 'Unexpected error',
        });
    }
});
app.get('/veggie/:veggieName', async (req, res) => {
    const { veggieName } = req.params;

    if (!veggieName) {
        return res.status(400).json({
            message: 'Invalid request',
        });
    }

    try {
        const veggie = await Veggie.find({
            name: veggieName,
        });

        if (veggie) {
            res.status(200).json(veggie);
        } else {
            res.status(404).json({
                message: `No veggie with name ${veggieName} was found`,
            });
        }
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
