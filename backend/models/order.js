const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    reservedSeats: {
        type: Array,
        required: true
    },
    routeId: {
        type: Schema.Types.ObjectId,
        ref: 'Route'
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);