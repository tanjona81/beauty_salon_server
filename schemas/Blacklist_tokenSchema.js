const mongoose = require('mongoose');

const Blacklist_tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("blacklist_token", Blacklist_tokenSchema)