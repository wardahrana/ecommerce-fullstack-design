import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, useScroll, useTransform } from 'framer-motion';

const CATEGORIES = [
    { label: "Automobiles", path: "/category/automobiles" },
    { label: "Clothes and wear", path: "/category/clothes" },
    { label: "Home interiors", path: "/category/home" },
    { label: "Computer and tech", path: "/category/tech" },
    { label: "Tools, equipments", path: "/category/tools" },
    { label: "Sports and outdoor", path: "/category/sports" },
    { label: "Animal and pets", path: "/category/pets" },
    { label: "Machinery tools", path: "/category/machinery" },
    { label: "More category", path: "/categories" },
];

const HeroSection = () => {
    const containerRef = useRef(null);
    const user = useSelector((state) => state.user?.currentUser || null);

    // Parallax effect setup
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Staggered animation variants for text
    const textContainerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const textItemVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="bg-gray-50 py-4" ref={containerRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]">

                    {/* 1. Left Sidebar - Categories */}
                    <div className="hidden lg:block w-56 shrink-0 h-full overflow-y-auto scrollbar-hide">
                        <ul className="space-y-1 pr-2">
                            {CATEGORIES.map((category, index) => (
                                <li key={index}>
                                    <Link
                                        to={category.path}
                                        className={`block px-3 py-2 rounded-md text-[13px] transition-colors ${index === 0
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                            }`}
                                    >
                                        {category.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Center - Parallax Banner */}
                    <div className="relative flex-1 bg-teal-100 rounded-md overflow-hidden min-h-[300px]">
                        {/* Parallax Image Background */}
                        <motion.div
                            className="absolute inset-0 z-0 origin-center"
                            style={{ y: yParallax, scale: 1.15 }} // Scale up slightly to avoid edge clipping during scroll
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-right md:bg-center"
                                // Placeholder image similar to the tech setup in Figma
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop')" }}
                            />
                            <div className="absolute inset-0 bg-teal-300/40 mix-blend-multiply" /> {/* Teal overlay to match Figma */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-200/90 to-transparent" />
                        </motion.div>

                        {/* Banner Content */}
                        <motion.div
                            variants={textContainerVariant}
                            initial="hidden"
                            animate="visible"
                            className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center w-full max-w-sm"
                        >
                            <motion.h2
                                variants={textItemVariant}
                                className="text-2xl font-light text-gray-900 mb-1"
                            >
                                Latest trending
                            </motion.h2>
                            <motion.h1
                                variants={textItemVariant}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                            >
                                Electronic items
                            </motion.h1>

                            <motion.div variants={textItemVariant}>
                                <motion.div
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block"
                                >
                                    <Link
                                        to="/category/tech"
                                        className="bg-white text-gray-800 text-[13px] font-medium px-5 py-2.5 rounded shadow-sm transition-colors border border-gray-100"
                                    >
                                        Learn more
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* 3. Right Sidebar - User & Offers */}
                    <div className="w-full lg:w-[220px] shrink-0 flex flex-col gap-3 h-full">

                        {/* User Profile Card */}
                        <div className="bg-[#E3F0FF] p-4 rounded-md flex flex-col justify-center flex-shrink-0">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-11 h-11 bg-blue-200 rounded-full flex items-center justify-center text-white overflow-hidden shrink-0">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="leading-tight">
                                    <p className="text-[13px] text-gray-800 font-medium">Hi, {user ? user.name : 'user'}</p>
                                    <p className="text-[11px] text-gray-500">let's get stated</p>
                                </div>
                            </div>

                            {!user ? (
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link to="/register" className="block text-center bg-[#0d6efd] text-white text-[12px] font-medium py-1.5 rounded">
                                            Join now
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link to="/login" className="block text-center bg-white text-[#0d6efd] text-[12px] font-medium py-1.5 rounded border border-gray-200 shadow-sm">
                                            Log in
                                        </Link>
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link to="/profile" className="block text-center bg-[#0d6efd] text-white text-[12px] font-medium py-1.5 rounded">
                                            Go to Profile
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* Orange Offer Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-[#f38332] p-4 rounded-md flex-1 text-white flex items-center shadow-sm"
                        >
                            <p className="text-[13px] font-medium leading-snug w-4/5">
                                Get US $10 off with a new supplier
                            </p>
                        </motion.div>

                        {/* Teal Offer Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-[#55bdc3] p-4 rounded-md flex-1 text-white flex items-center shadow-sm"
                        >
                            <p className="text-[13px] font-medium leading-snug w-4/5">
                                Send quotes with supplier preferences
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
