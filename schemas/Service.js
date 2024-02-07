const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    duree: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("service", serviceSchema)