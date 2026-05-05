import React from 'react';
import { motion } from 'framer-motion';

// Mock data matching the Consumer Electronics section
const ELECTRONICS_DATA = [
    { name: "Smart watches", price: "From USD 19", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
    { name: "Cameras", price: "From USD 89", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" },
    { name: "Headphones", price: "From USD 10", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { name: "Smart watches", price: "From USD 90", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80" },
    { name: "Gaming set", price: "From USD 35", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&q=80" },
    { name: "Laptops & PC", price: "From USD 340", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80" },
    { name: "Smartphones", price: "From USD 19", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
    { name: "Electric kattle", price: "From USD 240", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=200&q=80" },
];

const CategoryCards = ({
    title = "Consumer electronics and gadgets",
    bannerImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    products = ELECTRONICS_DATA
}) => {
    return (
        <section className="py-4 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="bg-white border border-gray-200 rounded-md flex flex-col md:flex-row overflow-hidden shadow-sm">

                    {/* Left Block: Banner */}
                    <div className="relative w-full md:w-[280px] shrink-0 bg-cover bg-center min-h-[250px] md:min-h-[260px]"
                        style={{ backgroundImage: `url('${bannerImage}')` }}>
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-[#e0f1f9]/80 md:bg-[#e0f1f9]/40 mix-blend-overlay"></div>

                        <div className="relative z-10 p-6 flex flex-col h-full">
                            <h3 className="text-[20px] font-bold text-[#1c1c1c] mb-4 pr-10 leading-snug w-3/4">
                                {title}
                            </h3>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-auto self-start bg-white text-[#1c1c1c] text-[15px] font-medium px-5 py-2.5 rounded shadow-sm border border-gray-100"
                            >
                                Source now
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Block: Grid (1px gap trick for perfect borders) */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-gray-200">
                        {products.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ backgroundColor: "#f8f9fa", scale: 1.01, zIndex: 10, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                                className="bg-white p-4 flex flex-row items-center justify-between cursor-pointer relative"
                            >
                                <div className="flex flex-col justify-start h-full">
                                    <h4 className="text-[15px] text-[#1c1c1c] mb-1 leading-tight">{item.name}</h4>
                                    <p className="text-[13px] text-[#8b96a5]">{item.price}</p>
                                </div>
                                <div className="w-[75px] h-[75px] shrink-0 overflow-hidden ml-2 flex items-center justify-center">
                                    <motion.img
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        src={item.image}
                                        alt={item.name}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CategoryCards;
