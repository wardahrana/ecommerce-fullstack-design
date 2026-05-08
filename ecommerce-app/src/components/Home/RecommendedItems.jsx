// components/Home/RecommendedItems.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';

const RecommendedItems = () => {
    const { products } = useProducts();
    const [hoveredProduct, setHoveredProduct] = useState(null);

    // Get first 10 products or all
    const recommendedProducts = products.length > 10 ? products.slice(0, 10) : products;

    return (
        <section className="py-8 pb-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">

                {/* Section Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Recommended items</h3>
                        <p className="text-gray-500 text-sm mt-1">Based on your preferences</p>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                        View All →
                    </button>
                </div>

                {recommendedProducts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">No products found. Add some products from admin panel.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {recommendedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                onHoverStart={() => setHoveredProduct(product.id)}
                                onHoverEnd={() => setHoveredProduct(null)}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                {/* Product Image Container */}
                                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-hidden">
                                    <motion.div
                                        animate={{ scale: hoveredProduct === product.id ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-[150px] flex items-center justify-center"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="max-h-full max-w-full object-contain"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/150x150?text=Product";
                                            }}
                                        />
                                    </motion.div>

                                    {/* Discount Badge */}
                                    {product.oldPrice && (
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                                            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                        </div>
                                    )}

                                    {/* Wishlist Button */}
                                    <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                        <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>

                                    {/* Quick Add Button */}
                                    <AnimatePresence>
                                        {hoveredProduct === product.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                className="absolute bottom-3 left-3 right-3"
                                            >
                                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg shadow-lg transition-colors">
                                                    Add to Cart
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Product Info */}
                                <div className="p-3">
                                    {/* Category/Type Badge */}
                                    {product.type && (
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mb-2">
                                            {product.type}
                                        </span>
                                    )}

                                    {/* Product Title */}
                                    <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[40px]">
                                        {product.title}
                                    </h4>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-lg font-bold text-blue-600">
                                            ${product.price}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-xs text-gray-400 line-through">
                                                ${product.oldPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* From USD Text */}
                                    <p className="text-xs text-gray-500 mb-2">
                                        From USD {Math.floor(product.price)}
                                    </p>

                                    {/* Rating and Stock */}
                                    <div className="flex items-center justify-between">
                                        {product.rating && (
                                            <div className="flex items-center gap-1">
                                                <div className="flex text-yellow-400 text-xs">
                                                    {"★".repeat(Math.floor(product.rating))}
                                                    {"☆".repeat(5 - Math.floor(product.rating))}
                                                </div>
                                                <span className="text-xs text-gray-500">({product.reviewCount})</span>
                                            </div>
                                        )}

                                        {/* Stock Status */}
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.stockStatus === 'In stock'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {product.stockStatus === 'In stock' ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {recommendedProducts.length > 0 && (
                    <div className="text-center mt-10">
                        <button className="px-8 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                            Load More Products
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecommendedItems;