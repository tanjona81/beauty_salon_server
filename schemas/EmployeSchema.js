const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
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
        unique: true,
        validate:{
            validator: v => v.includes('@') === true,
            message: props => `${props.value} is not a valid email`
        }
    },
    addresse: {
        type: String
    },
    mdp: {
        type: String,
        required: true
    },
    heure_debut: {
        type: String,
        required: true
    },
    heure_fin: {
        type: String,
        required: true
    },
    is_activated:{
        type: Number,
        default: () => 1
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("employe", employeSchema)