import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../pages/LoginModel';

import menTShirt from '../../assets/cloth/1.jpg';
import blueJeansShorts from '../../assets/cloth/4.jpg';
import winterCoat from '../../assets/cloth/3.jpg';
import travelJeansBag from '../../assets/cloth/5.jpg';
import leatherWallet from '../../assets/cloth/6.jpg';
import denimShorts from '../../assets/cloth/7.jpg';
import backpack from '../../assets/tech/9.jpg';
import ceramicPot from '../../assets/interior/3.jpg';
import electricKettle from '../../assets/tech/10.jpg';
import moneyplant from '../../assets/interior/4.jpg';

const RECOMMENDED = [
    { id: "rec-1", name: "Men's T-Shirts", price: 10.30, priceLabel: "$10.30", description: "T-shirts with multiple colors, for men.", category: "Clothing", image: menTShirt },
    { id: "rec-2", name: "Blue Jeans Shorts", price: 10.30, priceLabel: "$10.30", description: "Jeans shorts for men blue color.", category: "Clothing", image: blueJeansShorts },
    { id: "rec-3", name: "Winter Coat", price: 12.50, priceLabel: "$12.50", description: "Brown winter coat medium size.", category: "Clothing", image: winterCoat },
    { id: "rec-4", name: "Travel Jeans Bag", price: 34.00, priceLabel: "$34.00", description: "Jeans bag for travel for men.", category: "Accessories", image: travelJeansBag },
    { id: "rec-5", name: "Leather Wallet", price: 99.00, priceLabel: "$99.00", description: "Premium genuine leather wallet.", category: "Accessories", image: leatherWallet },
    { id: "rec-6", name: "Denim Shorts", price: 9.99, priceLabel: "$9.99", description: "Jeans shorts for men blue color.", category: "Clothing", image: denimShorts },
    { id: "rec-8", name: "Backpack", price: 10.30, priceLabel: "$10.30", description: "Jeans bag for travel for men.", category: "Accessories", image: backpack },
    { id: "rec-9", name: "Ceramic Pot", price: 80.95, priceLabel: "$80.95", description: "Ceramic pot for plants decoration.", category: "Home", image: ceramicPot },
    { id: "rec-10", name: "Electric Kettle", price: 9.99, priceLabel: "$9.99", description: "Fast boiling electric water kettle.", category: "Appliances", image: electricKettle },
    { id: "rec-11", name: "Men's T-Shirts", price: 10.30, priceLabel: "$10.30", description: "T-shirts with multiple colors, for men.", category: "Clothing", image: moneyplant },
];

const ProductImage = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    const [hasError, setHasError] = React.useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc('');
        }
    };

    return (
        <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={imgSrc}
            alt={alt}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
            loading="lazy"
            onError={handleError}
        />
    );
};

const RecommendedItems = () => {
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
        navigate(`/product/${item.id}`, { state: { product: item } });
    };

    return (
        <>
            <section className="py-4 pb-12 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                    <h3 className="text-[20px] font-bold text-[#1c1c1c] mb-5">Recommended items</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {RECOMMENDED.map((item) => (
                            <motion.div
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white border border-gray-200 rounded-md p-4 flex flex-col transition-shadow h-full"
                                style={{ cursor: user ? "pointer" : "not-allowed" }}
                            >
                                <div className="w-full h-[150px] mb-4 flex items-center justify-center overflow-hidden">
                                    <ProductImage src={item.image} alt={item.name} />
                                </div>
                                <p className="font-semibold text-[#1c1c1c] text-[16px] mb-1">{item.priceLabel}</p>
                                <p className="text-[#8b96a5] text-[14px] leading-snug line-clamp-2">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSwitchToSignup={() => setLoginModalOpen(false)}
                loginFn={login}
                from={pendingItem ? `/product/${pendingItem.id}` : '/'}
            />
        </>
    );
};

export default RecommendedItems;