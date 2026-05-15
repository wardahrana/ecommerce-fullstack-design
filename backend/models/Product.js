const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number },
    priceValue: { type: String },
    description: { type: String },
    category: { type: String },
    image: { type: String, required: true },
    componentType: {
        type: String,
        required: true,
        enum: ['featured', 'homeAndOutdoor', 'categoryCards', 'recommended']
    },
    discount: { type: String },
    priceLabel: { type: String, default: "From" }
}, { timestamps: true }); // Taake createdAt khud ba khud ban jaye

module.exports = mongoose.model('Product', productSchema);