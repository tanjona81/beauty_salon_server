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
        required: true,
        validate: {
            validator: function(value) {
                // Convert the time strings to numbers for comparison
                const heureDebut = parseInt(this.heure_debut.replace(':', ''));
                const heureFin = parseInt(value.replace(':', ''));

                // Check if heure_fin is greater than heure_debut
                return heureFin > heureDebut;
            },
            message: 'heure_fin must be greater than heure_debut'
        }
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