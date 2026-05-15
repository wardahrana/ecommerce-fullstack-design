// src/components/Home/HeroSection.jsx
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SignupModal from '../shared/SignupModal';
import LoginModal from '../../pages/LoginModel';
import { useAuth } from '../../context/AuthContext';

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

    // ✅ useAuth se live user state — context update hote hi yeh component re-render hoga
    const { user, signup, login } = useAuth();

    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const textContainerVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
    };
    const textItemVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // ✅ firstName: user ka actual first name jab logged in
    const firstName = user ? (user.name?.split(" ")[0] || "User") : "User";

    return (
        <>
            <section className="bg-gray-50 py-4" ref={containerRef}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]">

                        {/* Left Sidebar - Categories */}
                        <div className="hidden lg:block w-56 shrink-0 h-full overflow-y-auto scrollbar-hide">
                            <ul className="space-y-1 pr-2">
                                {CATEGORIES.map((category, index) => (
                                    <li key={index}>
                                        <Link
                                            to={category.path}
                                            /* ✅ Added 'no-underline' and 'hover:no-underline' to ensure the line is removed */
                                            className={`block px-3 py-2 rounded-md text-[13px] transition-colors no-underline hover:no-underline ${index === 0
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

                        {/* Center Banner */}
                        <div className="relative flex-1 bg-teal-100 rounded-md overflow-hidden min-h-[300px]">
                            <motion.div className="absolute inset-0 z-0 origin-center" style={{ y: yParallax, scale: 1.15 }}>
                                <div
                                    className="absolute inset-0 bg-cover bg-right md:bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop')" }}
                                />
                                <div className="absolute inset-0 bg-teal-300/40 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-200/90 to-transparent" />
                            </motion.div>
                            <motion.div
                                variants={textContainerVariant}
                                initial="hidden"
                                animate="visible"
                                className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center w-full max-w-sm"
                            >
                                <motion.h2 variants={textItemVariant} className="text-2xl font-light text-gray-900 mb-1">
                                    Latest trending
                                </motion.h2>
                                <motion.h1 variants={textItemVariant} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Electronic items
                                </motion.h1>
                                <motion.div variants={textItemVariant}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                                        <Link
                                            to="/category/tech"
                                            className="bg-white text-gray-800 text-[13px] font-medium px-5 py-2.5 rounded shadow-sm transition-colors border border-gray-100 no-underline"
                                        >
                                            Learn more
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* ✅ Right Sidebar — directly driven by live user state from context */}
                        <div className="w-full lg:w-[220px] shrink-0 flex flex-col gap-3 h-full">

                            <div className="bg-[#E3F0FF] p-4 rounded-md flex flex-col justify-center flex-shrink-0">
                                <div className="flex items-center gap-3 mb-3">

                                    {/* ✅ Avatar: first letter jab logged in, generic icon jab logged out */}
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden shrink-0"
                                        style={{ background: user ? "#1e3a8a" : "#bfdbfe" }}
                                    >
                                        {user ? (
                                            <span className="text-white font-bold text-lg select-none">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        ) : (
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* ✅ Greeting text */}
                                    <div className="leading-tight">
                                        <p className="text-[13px] text-gray-800 font-medium">
                                            {user ? `Hi, ${firstName}` : "Hi, User"}
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                            {user ? "Welcome back!" : "let's get started"}
                                        </p>
                                    </div>
                                </div>

                                {/* ✅ Join/Login buttons: sirf tab jab user logged OUT ho */}
                                {!user && (
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <button
                                            onClick={() => setIsSignupOpen(true)}
                                            className="w-full text-center bg-[#1e3a8a] text-white text-[12px] font-medium py-1.5 rounded hover:bg-[#1e3a8a]/90 transition-all"
                                        >
                                            Join now
                                        </button>
                                        <button
                                            onClick={() => setIsLoginOpen(true)}
                                            className="block w-full text-center bg-white text-[#1e3a8a] text-[12px] font-medium py-1.5 rounded border border-gray-200 shadow-sm hover:bg-gray-50 transition-all"
                                        >
                                            Log in
                                        </button>
                                    </div>
                                )}
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#f38332] p-4 rounded-md flex-1 text-white flex items-center shadow-sm cursor-pointer">
                                <p className="text-[13px] font-medium leading-snug w-4/5">Get Rs 1000 off with a new supplier</p>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#55bdc3] p-4 rounded-md flex-1 text-white flex items-center shadow-sm cursor-pointer">
                                <p className="text-[13px] font-medium leading-snug w-4/5">Send quotes with supplier preferences</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
                signupFn={signup}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
                loginFn={login}
                from="/"
            />
        </>
    );
};

export default HeroSection;