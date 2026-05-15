import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryCards = ({
    title = "Consumer electronics and gadgets",
    bannerImage,
    products = [],
    loading = false
}) => {

    return (
        <section className="py-4 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                {/* Main container with fixed border and overflow hidden */}
                <div className="bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row overflow-hidden min-h-[257px]">

                    {/* ── LEFT PANEL (Banner) ── */}
                    <div className="relative w-full md:w-[280px] shrink-0 min-h-[250px] flex flex-col border-r border-gray-200">
                        {bannerImage && (
                            <img
                                src={bannerImage}
                                alt="banner"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                        <div className="relative z-10 p-6">
                            <h3 className="text-[20px] font-bold text-[#1c1c1c] leading-tight mb-5 max-w-[150px]">
                                {title}
                            </h3>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold shadow-sm text-sm border-none cursor-pointer"
                            >
                                Source now
                            </motion.button>
                        </div>
                    </div>

                    {/* ── RIGHT BLOCK (Grid Layout 4x2) ── */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 bg-gray-200 gap-[1px]">
                        {loading ? (
                            <div className="col-span-4 p-10 text-center text-gray-400 bg-white">Loading...</div>
                        ) : (
                            products.map((item, idx) => (
                                <Link
                                    to={`/product/${item._id}`}
                                    key={item._id || idx}
                                    className="relative no-underline bg-white"
                                >
                                    <motion.div
                                        className="p-4 h-[128px] flex justify-between bg-white hover:bg-gray-50 transition-all"
                                    >
                                        {/* Text Info (Top Left) */}
                                        <div className="flex flex-col">
                                            <h4 className="text-[14px] text-[#1c1c1c] font-medium leading-tight m-0">
                                                {item.name}
                                            </h4>
                                            <div className="mt-2 text-[#8b96a5] text-[12px]">
                                                <span className="block opacity-70">From</span>
                                                <span className="font-medium">
                                                    Rs. {item.price}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Image Container (Bottom Right) */}
                                        <div className="self-end w-[65px] h-[65px] flex items-center justify-center">
                                            <motion.img
                                                whileHover={{ scale: 1.1 }}
                                                src={item.image}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CategoryCards;