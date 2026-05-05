import React from 'react';
import { motion } from 'framer-motion';

const RECOMMENDED = [
    { price: "$10.30", desc: "T-shirts with multiple colors, for men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" },
    { price: "$10.30", desc: "Jeans shorts for men blue color", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80" },
    { price: "$12.50", desc: "Brown winter coat medium size", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80" },
    { price: "$34.00", desc: "Jeans bag for travel for men", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80" },
    { price: "$99.00", desc: "Leather wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80" },
    { price: "$9.99", desc: "Jeans shorts for men blue color", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80" },
    { price: "$8.99", desc: "Headphones with mic", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { price: "$10.30", desc: "Jeans bag for travel for men", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80" },
    { price: "$80.95", desc: "Ceramic pot for plants", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&q=80" },
    { price: "$9.99", desc: "Electric kettle", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=200&q=80" },
];

const RecommendedItems = () => {
    return (
        <section className="py-4 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <h3 className="text-[20px] font-bold text-[#1c1c1c] mb-5">Recommended items</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {RECOMMENDED.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
                            className="bg-white border border-gray-200 rounded-md p-4 flex flex-col cursor-pointer transition-shadow"
                        >
                            <div className="w-full h-[150px] mb-4 flex items-center justify-center overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.desc}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                    loading="lazy"
                                />
                            </div>
                            <p className="font-semibold text-[#1c1c1c] text-[16px] mb-1">{item.price}</p>
                            <p className="text-[#8b96a5] text-[14px] leading-snug line-clamp-2">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedItems;
