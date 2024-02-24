const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    id_rendezvous: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "rendezvous",
        required: true,
        unique: true
    },
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
    prix: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("Payment", PaymentSchema)