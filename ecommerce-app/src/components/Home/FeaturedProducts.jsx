// components/Home/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';

const FeaturedProducts = () => {
    const { products } = useProducts();

    const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 13, mins: 34, secs: 56 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, mins, secs } = prev;
                if (secs > 0) secs--;
                else {
                    secs = 59;
                    if (mins > 0) mins--;
                    else {
                        mins = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Get unique products (no repeats)
    const getUniqueProducts = () => {
        if (!products || products.length === 0) {
            return [];
        }
        const unique = [];
        const seenIds = new Set();
        for (const product of products) {
            if (!seenIds.has(product.id)) {
                seenIds.add(product.id);
                unique.push(product);
            }
        }
        // Take first 5 products for 5 columns
        return unique.slice(0, 5);
    };

    const displayProducts = getUniqueProducts();
    const PLACEHOLDER = 'https://placehold.co/80x80/9ca3af/white?text=Product';

    const calculateDiscount = (oldPrice, currentPrice) => {
        if (oldPrice && currentPrice && oldPrice > currentPrice) {
            return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
        }
        return null;
    };

    return (
        <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        {/* Left Side - Timer Section */}
                        <div className="md:w-[280px] bg-white p-6 md:p-8 flex flex-col justify-start">
                            <div className="mb-4">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1">
                                    Deals and offers
                                </h3>
                                <p className="text-sm md:text-base text-gray-500">
                                    Hygiene equipments
                                </p>
                            </div>

                            {/* Timer */}
                            <div className="flex gap-2">
                                {[
                                    { label: 'Days', value: timeLeft.days },
                                    { label: 'Hour', value: timeLeft.hours },
                                    { label: 'Min', value: timeLeft.mins },
                                    { label: 'Sec', value: timeLeft.secs }
                                ].map((time, idx) => (
                                    <div key={idx} className="bg-[#606060] text-white rounded-[4px] w-[50px] h-[60px] flex flex-col items-center justify-center">
                                        <span className="font-bold text-lg leading-none">{String(time.value).padStart(2, '0')}</span>
                                        <span className="text-[10px] mt-1 font-light opacity-90">{time.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - 5 Columns Horizontal Grid */}
                        <div className="flex-1 overflow-x-auto">
                            {displayProducts.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 w-full">
                                    <p>No products available.</p>
                                    <p className="text-sm mt-2">Add products from admin panel.</p>
                                </div>
                            ) : (
                                <div className="flex flex-nowrap md:grid md:grid-cols-5 w-full md:divide-x divide-gray-200 min-w-max md:min-w-0">
                                    {displayProducts.map((product, index) => {
                                        const discount = calculateDiscount(product.oldPrice, product.price);
                                        return (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex flex-col items-center p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer group w-[160px] md:w-auto"
                                            >
                                                {/* Product Image */}
                                                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-4 flex items-center justify-center overflow-hidden shrink-0">
                                                    <img
                                                        src={product.image || PLACEHOLDER}
                                                        alt={product.title}
                                                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = PLACEHOLDER;
                                                        }}
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex flex-col items-center text-center w-full">
                                                    <h4 className="text-sm text-gray-800 mb-2 truncate w-full px-2">
                                                        {product.title || 'Product'}
                                                    </h4>

                                                    {discount ? (
                                                        <span className="text-xs font-semibold text-red-500 bg-red-100 px-3 py-1 rounded-full">
                                                            -{discount}%
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-red-500 bg-red-100 px-3 py-1 rounded-full">
                                                            -25%
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;