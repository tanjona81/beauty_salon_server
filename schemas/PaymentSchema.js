const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    id_rendezvous: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "rendezvous",
        required: true,
        unique: true
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