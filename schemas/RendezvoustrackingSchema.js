const mongoose = require('mongoose');

const rdvtrackingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: () => Date.now(),
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

module.exports = mongoose.model("rendezvoustracking", rdvtrackingSchema)