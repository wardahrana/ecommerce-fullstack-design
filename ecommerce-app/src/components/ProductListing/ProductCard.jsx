import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            className="flex flex-col sm:flex-row bg-white rounded-2xl p-4 border border-gray-100 shadow-sm transition-all duration-300"
        >
            <div className="w-full sm:w-48 h-48 shrink-0 flex items-center justify-center p-2 mb-4 sm:mb-0 bg-white">
                <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="flex flex-col flex-1 sm:ml-6 justify-center">
                <div className="flex justify-between items-start">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{product.title}</h3>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 p-2 rounded-md border border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </motion.button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                    )}
                </div>

                <div className="flex items-center gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                        <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-amber-500 font-medium">{product.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400">{product.orders} orders</span>
                    {product.freeShipping && (
                        <>
                            <span className="text-gray-300">•</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">Free Shipping</span>
                        </>
                    )}
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto">
                    <Link to={`/product/${product.id}`} className="text-blue-600 font-medium text-sm hover:underline inline-flex items-center group">
                        View details
                        <motion.svg
                            className="w-4 h-4 ml-1"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
