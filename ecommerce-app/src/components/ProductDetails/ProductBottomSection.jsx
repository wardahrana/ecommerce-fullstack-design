import React from 'react';
import { motion } from 'framer-motion';

const ProductBottomSection = () => {
    const relatedProducts = [
        { id: 201, title: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=150&auto=format&fit=crop" },
        { id: 202, title: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=150&auto=format&fit=crop" },
        { id: 203, title: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&auto=format&fit=crop" },
        { id: 204, title: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=150&auto=format&fit=crop" },
        { id: 205, title: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=150&auto=format&fit=crop" },
        { id: 206, title: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=150&auto=format&fit=crop" }
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Related Products */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {relatedProducts.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="flex flex-col cursor-pointer group"
                        >
                            <div className="bg-gray-100 rounded-lg p-4 mb-3 aspect-square flex items-center justify-center">
                                <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" />
                            </div>
                            <div className="text-sm text-gray-700 leading-tight mb-1 group-hover:text-blue-500 transition-colors">
                                {item.title}
                            </div>
                            <div className="text-sm text-gray-400">
                                {item.price}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Super Discount Banner */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#0052FF] rounded-xl overflow-hidden relative"
            >
                {/* Diagonal cut background element */}
                <div className="absolute inset-y-0 right-0 w-1/3 bg-[#1164FF] transform origin-bottom-right -skew-x-12 translate-x-10"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between p-6 lg:px-10 lg:py-8">
                    <div className="text-white mb-4 sm:mb-0">
                        <h2 className="text-2xl font-bold mb-1">Super discount on more than 100 USD</h2>
                        <p className="text-blue-100 text-sm">Have you ever finally just write dummy info</p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange-500 text-white font-medium px-6 py-2 rounded-md hover:bg-orange-600 transition-colors shadow-sm shrink-0"
                    >
                        Shop now
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductBottomSection;
