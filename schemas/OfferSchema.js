const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
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
    reduction: {
        type: Number,
        required: true,
        validate:{
            validator: redu => redu > 0,
            message: props => `${props.value} should not be lower or equals to 0`
        }
    },
    date_heure_fin: {
        type: Date,
        required: true,
        validate:{
            validator: date => date > new Date(),
            message: props => `${props.value} should not be lower than the current date`
        }
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
})

// const dateValidator = function(date) {
//     return date >= new Date();
// };

module.exports = mongoose.model("offer", offerSchema)