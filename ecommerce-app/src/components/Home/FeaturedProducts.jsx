import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../pages/LoginModel';

import watch from '../../assets/tech/8.jpg';
import Laptop from '../../assets/tech/7.jpg';
import camera from '../../assets/tech/6.jpg';
import Headphone from '../../assets/tech/5.jpg';
import Phone from '../../assets/tech/4.jpg';

const DEALS = [
    { id: "feat-1", name: "Smart watches", discount: "-25%", price: 199, description: "High-performance smartwatch with fitness tracking and notifications.", category: "Wearables", image: watch },
    { id: "feat-2", name: "Laptops", discount: "-15%", price: 899, description: "Powerful laptop for work and gaming with high-res display.", category: "Computers", image: Laptop },
    { id: "feat-3", name: "GoPro cameras", discount: "-40%", price: 299, description: "Action camera for extreme sports and outdoor adventures.", category: "Cameras", image: camera },
    { id: "feat-4", name: "Headphones", discount: "-25%", price: 149, description: "Noise-cancelling wireless headphones with deep bass.", category: "Audio", image: Headphone },
    { id: "feat-5", name: "Canon cameras", discount: "-25%", price: 499, description: "Professional DSLR camera for high-quality photography.", category: "Cameras", image: Phone },
];

const FeaturedProducts = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState(null);
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
                        else { hours = 23; if (days > 0) days--; }
                    }
                }
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleProductClick = (deal) => {
        if (!user) {
            setPendingProduct(deal);
            setLoginModalOpen(true);
            return;
        }
        navigate(`/product/${deal.id}`, { state: { product: deal } });
    };

    return (
        <>
            <section className="py-4 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                    <div className="bg-white border border-gray-200 rounded-md flex flex-col md:flex-row overflow-hidden shadow-sm">

                        {/* Left Block: Countdown */}
                        <div className="p-6 border-b md:border-b-0 border-r border-gray-200 w-full md:w-[280px] shrink-0">
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

                        {/* Right Block: Products */}
                        <div className="flex-1 flex overflow-x-auto scrollbar-hide">
                            {DEALS.map((deal) => (
                                <div
                                    key={deal.id}
                                    onClick={() => handleProductClick(deal)}
                                    className="flex-1 min-w-[150px] border-r border-gray-200 last:border-r-0 no-underline"
                                    style={{ cursor: user ? "pointer" : "not-allowed" }}
                                >
                                    <motion.div
                                        whileHover={{ backgroundColor: "#f8f9fa" }}
                                        className="p-5 flex flex-col items-center justify-between h-full transition-colors"
                                    >
                                        <div className="w-[120px] h-[120px] mb-4 overflow-hidden flex items-center justify-center bg-white relative group">
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSwitchToSignup={() => setLoginModalOpen(false)}
                loginFn={login}
                from={pendingProduct ? `/product/${pendingProduct.id}` : '/'}
            />
        </>
    );
};

export default FeaturedProducts;