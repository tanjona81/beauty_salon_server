const mongoose = require('mongoose');

const rdvtrackingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("rendezvoustracking", rdvtrackingSchema)