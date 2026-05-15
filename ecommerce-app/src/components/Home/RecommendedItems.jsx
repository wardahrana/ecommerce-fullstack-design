import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../pages/LoginModel';

const RecommendedItems = ({ items }) => { // Data ab props se aa raha hai
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [pendingItem, setPendingItem] = useState(null);

    const handleItemClick = (item) => {
        if (!user) {
            setPendingItem(item);
            setLoginModalOpen(true);
            return;
        }
        // Local data use karte waqt '_id' ki jagah 'id' check karein
        navigate(`/product/${item.id || item._id}`, { state: { product: item } });
    };

    return (
        <>
            <section className="py-4 pb-12 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                    <h3 className="text-[20px] font-bold text-[#1c1c1c] mb-5">Recommended items</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {items && items.length > 0 ? (
                            items.map((item) => (
                                <motion.div
                                    key={item.id || item._id}
                                    onClick={() => handleItemClick(item)}
                                    whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
                                    className="bg-white border border-gray-200 rounded-md p-4 flex flex-col transition-shadow h-full cursor-pointer"
                                >
                                    <div className="w-full h-[150px] mb-4 flex items-center justify-center overflow-hidden">
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            src={item.image}
                                            alt={item.name}
                                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <p className="font-semibold text-[#1c1c1c] text-[16px] mb-1">
                                        Rs. {item.price.toLocaleString()}
                                    </p>
                                    <p className="text-[#8b96a5] text-[14px] leading-snug line-clamp-2">
                                        {item.name}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-400">
                                No recommendations found.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                loginFn={login}
                from={pendingItem ? `/product/${pendingItem.id || pendingItem._id}` : '/'}
            />
        </>
    );
};

export default RecommendedItems;