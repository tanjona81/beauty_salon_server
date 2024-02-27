const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    image: {
        type: String
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    sexe: {
        type: String
    },
    tel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    addresse: {
        type: String
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

module.exports = mongoose.model("customer", customerSchema)