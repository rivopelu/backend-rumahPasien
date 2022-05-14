const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ketersediaan: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ambulance', ambulanceSchema);