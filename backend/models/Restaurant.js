const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    priceRange: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema); 