const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    prix: {
        type: Number,
        min: 1,
        required: true
    },
    duree: {
        type: Number,
        min: 1,
        required: true
    },
    commission: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("service", serviceSchema)