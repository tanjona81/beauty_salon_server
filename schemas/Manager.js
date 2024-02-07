const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    mdp: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("manager", managerSchema)