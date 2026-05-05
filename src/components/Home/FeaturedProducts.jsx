import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock data matching the Figma Deals & Offers section
const DEALS = [
    { name: "Smart watches", discount: "-25%", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
    { name: "Laptops", discount: "-15%", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80" },
    { name: "GoPro cameras", discount: "-40%", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=80" },
    { name: "Headphones", discount: "-25%", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { name: "Canon cameras", discount: "-25%", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" },
];

const FeaturedProducts = () => {
    // Countdown Timer State
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

    return (
        <section className="py-4 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="bg-white border border-gray-200 rounded-md flex flex-col md:flex-row overflow-hidden shadow-sm">

                    {/* Left Block: Countdown */}
                    <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-[280px] shrink-0">
                        <h3 className="text-[20px] font-bold text-gray-900 mb-1">Deals and offers</h3>
                        <p className="text-gray-500 text-[15px] mb-4">Hygiene equipments</p>

                        <div className="flex gap-2">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hour', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.mins },
                                { label: 'Sec', value: timeLeft.secs }
                            ].map((time, idx) => (
                                <div key={idx} className="bg-[#606060] text-white w-[50px] h-[55px] rounded flex flex-col items-center justify-center">
                                    <span className="font-bold text-[16px] leading-none">{String(time.value).padStart(2, '0')}</span>
                                    <span className="text-[11px] mt-1 font-light">{time.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Block: Products List */}
                    <div className="flex-1 flex overflow-x-auto scrollbar-hide divide-x divide-gray-200">
                        {DEALS.map((deal, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ backgroundColor: "#f8f9fa" }}
                                className="p-5 flex flex-col items-center justify-between min-w-[150px] flex-1 cursor-pointer transition-colors"
                            >
                                <div className="w-[110px] h-[110px] mb-4 overflow-hidden flex items-center justify-center">
                                    <motion.img
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        src={deal.image}
                                        alt={deal.name}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="text-[15px] text-[#1c1c1c] text-center mb-2 font-medium">{deal.name}</p>
                                <span className="bg-[#ffe3e3] text-[#eb001b] text-[13px] font-semibold px-3 py-1 rounded-full">
                                    {deal.discount}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
