import React from 'react';
import { motion } from 'framer-motion';

const SupplierRequest = () => {
    return (
        <section className="py-4 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="relative rounded-md overflow-hidden bg-[#2c7cf1] min-h-[350px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8ed7c50800?q=80&w=1200&auto=format&fit=crop')" }}>

                    {/* Overlay to match Figma blue tint */}
                    <div className="absolute inset-0 bg-[#2c7cf1]/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2c7cf1] to-transparent opacity-90"></div>

                    <div className="relative z-10 flex flex-col md:flex-row w-full h-full p-6 md:p-10">

                        {/* Left Content */}
                        <div className="flex-1 text-white pr-4 md:pr-10 flex flex-col justify-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-[32px] font-bold leading-tight mb-4 max-w-md"
                            >
                                An easy way to send requests to all suppliers
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-blue-100 text-[15px] max-w-sm leading-relaxed"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                            </motion.p>
                        </div>

                        {/* Right Form Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 md:mt-0 w-full md:w-[420px] bg-white rounded-md p-6 shadow-lg shrink-0"
                        >
                            <h3 className="text-[20px] font-bold text-[#1c1c1c] mb-5">Send quote to suppliers</h3>

                            <form className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="What item you need?"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-[15px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                                <textarea
                                    placeholder="Type more details"
                                    rows="3"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-[15px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                                ></textarea>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Quantity"
                                        className="w-[60%] border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select
                                        className="w-[40%] border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
                                    >
                                        <option>Pcs</option>
                                        <option>Kgs</option>
                                        <option>Boxes</option>
                                    </select>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="bg-[#0d6efd] hover:bg-blue-700 text-white font-medium text-[15px] py-2.5 px-5 rounded mt-1 self-start shadow-sm transition-colors"
                                >
                                    Send inquiry
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};
export default SupplierRequest;
