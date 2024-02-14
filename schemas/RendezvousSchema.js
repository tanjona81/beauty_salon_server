const mongoose = require('mongoose');

const rendezvousSchema = new mongoose.Schema({
    id_customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "customer",
        required: true
    },
    id_service: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "service",
        required: true
    },
    id_employe: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "employe",
        required: true
    },
    date_heure: {
        type: Date,
        required: true
    },
    is_valid: {
        type: Number,
        required: true,
        default: 0
    },
    is_paid: {
        type: Number,
        required: true,
        default: 0
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("rendezvous", rendezvousSchema)