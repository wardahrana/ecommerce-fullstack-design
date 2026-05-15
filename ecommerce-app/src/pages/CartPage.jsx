import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

const CartPage = () => {
    const {
        items,
        loading,
        totalPrice,
        totalItems,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-12 h-12 border-4 border-[#1e3a8a]/30 border-t-[#1e3a8a] rounded-full animate-spin" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white dark:bg-gray-800 rounded-[2.5rem] p-12 text-center shadow-xl border border-gray-100 dark:border-gray-700"
                >
                    <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-[#1e3a8a] dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center justify-center w-full bg-[#1e3a8a] hover:bg-[#162a63] text-white py-4 px-8 rounded-2xl font-bold tracking-widest uppercase text-sm shadow-[0_10px_20px_rgba(30,58,138,0.3)] transition-all active:scale-95 gap-2"
                    >
                        Start Shopping <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
                    <span className="bg-[#1e3a8a] text-white py-1 px-3 rounded-full text-sm font-semibold shadow-md">
                        {totalItems} Items
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Items List (Left Side) */}
                    <div className="lg:col-span-8 space-y-4">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div 
                                    key={item._id || item.product}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                    className="bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-6 relative group overflow-hidden"
                                >
                                    {/* Glassmorphism shine effect */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-2xl bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
                                        <img
                                            src={item.image || 'https://via.placeholder.com/150'}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">{item.name}</h3>
                                                {(item.size || item.color) && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {item.size && <span>Size: {item.size} </span>}
                                                        {item.color && <span>Color: {item.color}</span>}
                                                    </p>
                                                )}
                                                <p className="text-sm text-emerald-600 font-medium mt-2">In Stock</p>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white flex-shrink-0">
                                                Rs {item.price}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-6">
                                            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
                                                <button
                                                    onClick={() => updateQuantity(item._id || item.product, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm text-gray-600 dark:text-gray-300 transition-all"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id || item.product, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm text-gray-600 dark:text-gray-300 transition-all"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id || item.product)}
                                                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
                                            >
                                                <Trash2 size={18} /> <span className="hidden sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="pt-4 flex justify-between items-center">
                            <Link to="/" className="text-[#1e3a8a] dark:text-blue-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                <ArrowRight size={18} className="rotate-180" /> Continue Shopping
                            </Link>
                            <button
                                onClick={clearCart}
                                className="text-rose-500 font-semibold hover:text-rose-600 transition-colors text-sm"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary (Right Side) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8">
                        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            {/* Top decorative gradient */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1e3a8a] to-blue-400" />

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8 text-gray-600 dark:text-gray-300">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">Rs {totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping Estimate</span>
                                    <span className="font-semibold text-emerald-600">Free</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Tax Estimate</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">Rs 0</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-700 pt-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                                    <span className="text-2xl font-black text-[#1e3a8a] dark:text-blue-400">Rs {totalPrice}</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#1e3a8a] hover:bg-[#162a63] text-white py-4 rounded-2xl font-bold tracking-widest uppercase text-sm shadow-[0_10px_20px_rgba(30,58,138,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mb-6">
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>

                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <ShieldCheck size={18} className="text-emerald-500" />
                                <span>Secure encrypted checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;