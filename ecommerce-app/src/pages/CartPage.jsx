// frontend/src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
            <div className="container mx-auto p-8 text-center">
                Loading cart...
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                Shopping Cart ({totalItems} items)
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    {items.map((item) => (
                        <div key={item._id} className="border rounded-lg p-4 mb-3 flex gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-green-600 font-bold">₹{item.price}</p>

                                {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                                {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="ml-4 text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Clear Cart Button */}
                    <button
                        onClick={clearCart}
                        className="mt-4 text-red-500 hover:text-red-700"
                    >
                        Clear Entire Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal ({totalItems} items):</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total:</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                        Proceed to Checkout
                    </button>

                    <Link to="/" className="block text-center mt-3 text-blue-500 hover:underline">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;