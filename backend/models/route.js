const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    dateFrom: {
        type: String,
        required: true
    },
    seats: {
        type: Array,
        required: true
    },
    depTime: {
        type: String,
        required: true
    },
    coachType: {
        type: String,
        required: true
    },
    busName: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

module.exports = mongoose.model('Route', routeSchema);