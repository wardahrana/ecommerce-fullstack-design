// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AppFooter from '../components/shared/AppFooter';
import AppHeader from '../components/shared/AppHeader';

const CartPage = () => {
    // ========== CART STATE (Updated to match screenshot) ==========
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "T-shirts with multiple colors, for men and lady",
            size: "medium",
            color: "blue",
            material: "Plastic",
            seller: "Artel Market",
            price: 78.99,
            quantity: 9,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format",
            discount: 0,
            tax: 0
        },
        {
            id: 2,
            name: "T-shirts with multiple colors, for men and lady",
            size: "medium",
            color: "black",
            material: "Plastic",
            seller: "Best Factory LLC",
            price: 10.00,
            quantity: 3,
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format",
            discount: 140.97,
            tax: 14.00
        },
        {
            id: 3,
            name: "T-shirts with multiple colors, for men and lady",
            size: "medium",
            color: "blue",
            material: "Plastic",
            seller: "Artel Market",
            price: 70.50,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=200&auto=format",
            discount: 0,
            tax: 0
        }
    ]);

    const [savedForLater, setSavedForLater] = useState([
        {
            id: 101,
            name: "Golo HERO6 4K Action Camera - Black",
            price: 59.50,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&auto=format"
        },
        {
            id: 102,
            name: "Golo HERO6 4K Action Camera - Black",
            price: 59.50,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&auto=format"
        },
        {
            id: 103,
            name: "Golo HERO6 4K Action Camera - Black",
            price: 59.50,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&auto=format"
        },
        {
            id: 104,
            name: "Golo HERO6 4K Action Camera - Black",
            price: 59.50,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&auto=format"
        }
    ]);

    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    // ========== HELPER FUNCTIONS ==========
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const saveForLater = (item) => {
        setCartItems(prev => prev.filter(i => i.id !== item.id));
        setSavedForLater(prev => [...prev, {
            id: Date.now(),
            name: item.name,
            price: item.price,
            image: item.image
        }]);
    };

    const moveToCart = (savedItem) => {
        setSavedForLater(prev => prev.filter(item => item.id !== savedItem.id));
        setCartItems(prev => [...prev, {
            id: Date.now(),
            name: savedItem.name,
            size: "medium",
            color: "blue",
            material: "Plastic",
            seller: "Artel Market",
            price: savedItem.price,
            quantity: 1,
            image: savedItem.image,
            discount: 0,
            tax: 0
        }]);
    };

    const applyCoupon = () => {
        if (couponCode === 'SAVE20') {
            setCouponApplied(true);
        }
    };

    // ========== CALCULATIONS ==========
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (item.discount || 0), 0);
    const totalTax = cartItems.reduce((sum, item) => sum + (item.tax || 0), 0);
    const couponDiscount = couponApplied ? subtotal * 0.1 : 0;
    const grandTotal = subtotal - totalDiscount - couponDiscount + totalTax;

    // ========== EMPTY CART STATE ==========
    if (cartItems.length === 0 && savedForLater.length === 0) {
        return (
            <div className="min-h-screen bg-white py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <AppHeader />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="text-7xl mb-4">🛒</div>
                        <h2 className="text-2xl font-light text-gray-600 mb-2">Your cart is empty</h2>
                        <p className="text-gray-400 mb-6">Add items to get started</p>
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black text-white px-8 py-3 rounded-md font-medium"
                            >
                                Continue Shopping
                            </motion.button>
                        </Link>
                    </motion.div>

                    <AppFooter />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <AppHeader />

                {/* Page Title - Matches screenshot "My cart (3)" */}
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-light text-gray-800 mb-8"
                >
                    My cart ({cartItems.length})
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ========== LEFT COLUMN (2/3 width) - CART ITEMS ========== */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <AnimatePresence>
                                {cartItems.map((item, index) => {
                                    const itemTotal = (item.price * item.quantity) - (item.discount || 0);
                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-gray-100 pb-6"
                                        >
                                            <div className="flex gap-4">
                                                {/* Product Image */}
                                                <motion.div
                                                    whileHover={{ scale: 1.03 }}
                                                    className="w-28 h-28 bg-gray-50 rounded-md flex items-center justify-center shrink-0"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-24 h-24 object-contain"
                                                    />
                                                </motion.div>

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                                                        {item.name}
                                                    </h3>

                                                    {/* Specifications - matches screenshot */}
                                                    <div className="text-xs text-gray-400 mt-1 space-x-2">
                                                        <span>Size: {item.size},</span>
                                                        <span>Color: {item.color},</span>
                                                        <span>Material: {item.material}.</span>
                                                    </div>

                                                    {/* Seller and Actions - matches screenshot */}
                                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                                        <span className="text-xs text-gray-500">Seller: {item.seller}</span>
                                                        <button
                                                            onClick={() => saveForLater(item)}
                                                            className="text-xs text-blue-500 hover:text-blue-600"
                                                        >
                                                            Save for later
                                                        </button>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-xs text-red-400 hover:text-red-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>

                                                    {/* Price and Quantity Row - matches screenshot layout */}
                                                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-gray-800 font-medium">
                                                                ${item.price.toFixed(2)}
                                                            </span>

                                                            {/* Quantity Selector */}
                                                            <div className="flex items-center border border-gray-200 rounded">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="px-2 py-1 text-gray-500 hover:bg-gray-50"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="px-2 py-1 text-gray-500 hover:bg-gray-50"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Item Total */}
                                                        <span className="font-semibold text-gray-800">
                                                            ${itemTotal.toFixed(2)}
                                                        </span>
                                                    </div>

                                                    {/* Discount and Tax (if any) - matches screenshot */}
                                                    {(item.discount > 0 || item.tax > 0) && (
                                                        <div className="text-xs text-gray-500 mt-2 space-y-1">
                                                            {item.discount > 0 && (
                                                                <div>Discount: -${item.discount.toFixed(2)}</div>
                                                            )}
                                                            {item.tax > 0 && (
                                                                <div>Tax: +${item.tax.toFixed(2)}</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {/* Coupon Section - matches screenshot "Have a coupon?" */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="pt-4"
                            >
                                <div className="text-sm text-gray-500 mb-2">Have a coupon?</div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Add coupon"
                                        className="flex-1 px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 text-sm"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={applyCoupon}
                                        className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
                                    >
                                        Apply
                                    </motion.button>
                                </div>
                                {couponApplied && (
                                    <p className="text-green-500 text-xs mt-1">Coupon applied! 10% off</p>
                                )}
                            </motion.div>
                        </div>

                        {/* Continue Shopping Link */}
                        <Link to="/">
                            <motion.button
                                whileHover={{ x: -3 }}
                                className="mt-6 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                                ← Continue Shopping
                            </motion.button>
                        </Link>
                    </div>

                    {/* ========== RIGHT COLUMN (1/3 width) - ORDER SUMMARY ========== */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-50 p-6 rounded-lg sticky top-4"
                        >
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                {totalDiscount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-${totalDiscount.toFixed(2)}</span>
                                    </div>
                                )}

                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon discount (10%)</span>
                                        <span>-${couponDiscount.toFixed(2)}</span>
                                    </div>
                                )}

                                {totalTax > 0 && (
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>+${totalTax.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between font-semibold text-base">
                                        <span>Total</span>
                                        <span className="text-lg">${grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button - matches screenshot */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-6 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
                            >
                                Checkout →
                            </motion.button>

                            {/* Features Grid - matches screenshot */}
                            <div className="grid grid-cols-1 gap-3 mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="text-lg">🔒</span>
                                    <span>Secure payment</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="text-lg">💬</span>
                                    <span>Customer support</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="text-lg">🚚</span>
                                    <span>Free delivery</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ========== SAVED FOR LATER SECTION - matches screenshot ========== */}
                {savedForLater.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12"
                    >
                        <h2 className="text-xl font-light text-gray-800 mb-4">Saved for later</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {savedForLater.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -4 }}
                                    className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow"
                                >
                                    <div className="bg-gray-50 rounded-md p-2 mb-3 flex items-center justify-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-contain"
                                        />
                                    </div>
                                    <div className="text-sm font-medium text-gray-800 mb-1">
                                        ${item.price.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-gray-500 line-clamp-2 mb-2">
                                        {item.name}
                                    </div>
                                    <button
                                        onClick={() => moveToCart(item)}
                                        className="w-full text-xs text-blue-500 hover:text-blue-600 font-medium"
                                    >
                                        Move to cart →
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ========== SUPER DISCOUNT BANNER - matches screenshot ========== */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-center"
                >
                    <h3 className="text-white text-xl font-semibold mb-1">
                        Super discount on more than 100 USD
                    </h3>
                    <p className="text-blue-100 text-sm">
                        Have you ever finally just with the same price?
                    </p>
                </motion.div>

                {/* ========== BRAND SECTION - matches screenshot ========== */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center py-8 border-t border-gray-100"
                >
                    <h3 className="text-gray-800 font-medium mb-2">Brand</h3>
                    <p className="text-gray-400 text-sm">
                        Best information about the company gets here but now keep it open!
                    </p>
                </motion.div>

                {/* ========== FOOTER LINKS SECTION - matches screenshot ========== */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm"
                >
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">About</h4>
                        <ul className="space-y-1 text-gray-400">
                            <li>About Us</li>
                            <li>Find store</li>
                            <li>Categories</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Partnership</h4>
                        <ul className="space-y-1 text-gray-400">
                            <li>About Us</li>
                            <li>Find store</li>
                            <li>Categories</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Information</h4>
                        <ul className="space-y-1 text-gray-400">
                            <li>Help Center</li>
                            <li>Money Return</li>
                            <li>Shipping</li>
                            <li>Contact us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">For users</h4>
                        <ul className="space-y-1 text-gray-400">
                            <li>Login</li>
                            <li>Register</li>
                            <li>Settings</li>
                            <li>My Orders</li>
                        </ul>
                    </div>
                </motion.div>

                <AppFooter />
            </div>
        </div>
    );
};

export default CartPage;