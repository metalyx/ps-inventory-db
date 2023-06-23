const mongoose = require('mongoose');

const Veggie = mongoose.Schema({
    name: String,
    color: String,
});

module.exports = mongoose.model('Veggies', Veggie);
