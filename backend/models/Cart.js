const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    image: { type: String, required: true },
    size: { type: String, default: null },
    color: { type: String, default: null }
}, { _id: true });

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ← Yeh uncomment karo — next parameter correctly likha hai
cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    next();
});

module.exports = mongoose.model('Cart', cartSchema);