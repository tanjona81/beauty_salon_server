const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    id_customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "customer",
        required: true
    },
    id_prefere: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

preferenceSchema.index({ id_customer: 1, id_prefere: 1 },{unique:true});

module.exports = mongoose.model("preference", preferenceSchema)