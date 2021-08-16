const mongoose = require('mongoose');

const RateProductSchema = new mongoose.Schema({
    idUser: { type: Number, required: true },
    idProduct: { type: Number, required: true },
    rate: { type: Number, max:5, min:1 },
    comment: { type: String },
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RateProduct', RateProductSchema);