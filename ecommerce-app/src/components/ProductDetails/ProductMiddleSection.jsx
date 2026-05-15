import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts'

const ProductMiddleSection = ({ product }) => {
    const [activeTab, setActiveTab] = useState('Description');
    const tabs = ['Description', 'Reviews', 'Shipping', 'About seller'];


    const { products } = useProducts()
    const youMayLike = products.slice(0, 5)

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Content */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-6 overflow-hidden">
                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium whitespace-nowrap relative transition-colors ${activeTab === tab ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'Description' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 text-sm leading-relaxed">
                        <p className="mb-6">{product.description}</p>
                        <p className="mb-6">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                        {/* Specs Table */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6 max-w-xl">
                            {Object.entries(product.specifications).map(([key, val], idx) => (
                                <div key={key} className={`flex border-b border-gray-200 last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <div className="w-1/3 p-3 border-r border-gray-200 font-medium text-gray-500 capitalize">{key}</div>
                                    <div className="w-2/3 p-3 text-gray-700">{val}</div>
                                </div>
                            ))}
                        </div>

                        {/* Feature Checklist */}
                        <div className="space-y-3">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab !== 'Description' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-sm py-10 text-center">
                        {activeTab} information is currently not available.
                    </motion.div>
                )}
            </div>

            {/* Right Sidebar - You May Like */}
            <div className="w-full lg:w-[280px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5 self-start">
                <h3 className="font-semibold text-gray-900 mb-4">You may like</h3>
                <div className="flex flex-col gap-4">
                    {youMayLike.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-md border border-gray-100 p-1 shrink-0 bg-white flex items-center justify-center">
                                <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-sm text-gray-800 line-clamp-2 leading-tight mb-1 group-hover:text-blue-500 transition-colors">
                                    {item.title}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">{item.price}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductMiddleSection;
