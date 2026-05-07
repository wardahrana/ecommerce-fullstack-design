// components/Home/RecommendedItems.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';

const RecommendedItems = () => {
    const { products } = useProducts();

    // Get random 10 products or all if less than 10
    const recommendedProducts = products.length > 10 ? products.slice(0, 10) : products;

    return (
        <section className="py-4 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <h3 className="text-[20px] font-bold text-[#1c1c1c] mb-5">Recommended items</h3>

                {recommendedProducts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-md border border-gray-200">
                        <p className="text-gray-500">No products found. Add some products from admin panel.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {recommendedProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white border border-gray-200 rounded-md p-4 flex flex-col cursor-pointer transition-shadow"
                            >
                                <div className="w-full h-[150px] mb-4 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/150x150?text=Product";
                                        }}
                                    />
                                </div>
                                <p className="font-semibold text-[#1c1c1c] text-[16px] mb-1">
                                    ${product.price}
                                </p>
                                <p className="text-[#8b96a5] text-[14px] leading-snug line-clamp-2">
                                    {product.title}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-xs text-gray-600">{product.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                                </div>
                                <span className={`text-xs mt-2 ${product.stockStatus === 'In stock' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {product.stockStatus}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecommendedItems;