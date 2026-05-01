
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FOOTER_LINKS = {
    About: ["About Us", "Find store", "Categories", "Blogs"],
    Partnership: ["About Us", "Find store", "Categories", "Blogs"],
    Information: ["Help Center", "Money Refund", "Shipping", "Contact us"],
    "For users": ["Login", "Register", "Settings", "My Orders"],
};

const SOCIAL_ICONS = [
    {
        label: "Facebook",
        path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    },
    {
        label: "Twitter",
        path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    },
    {
        label: "LinkedIn",
        path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
    },
    {
        label: "Instagram",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
        label: "YouTube",
        path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
    },
];

// Stagger container variant
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

// Each column fades + slides up
const columnVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

export default function AppFooter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [focused, setFocused] = useState(false);

    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-80px" });

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000);
            setEmail("");
        }
    };

    return (
        <footer ref={footerRef}>

            {/* ── Newsletter ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gray-50 border-t border-gray-200 py-10"
            >
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Subscribe on our newsletter
                    </h3>
                    <p className="text-sm text-gray-500 mb-5">
                        Get daily news on upcoming offers from many suppliers all over the world
                    </p>

                    <form
                        onSubmit={handleSubscribe}
                        className="flex justify-center max-w-md mx-auto"
                    >
                        {/* Animated focus ring on input wrapper */}
                        <motion.div
                            animate={{
                                boxShadow: focused
                                    ? "0 0 0 3px rgba(59,130,246,0.2)"
                                    : "0 0 0 0px rgba(59,130,246,0)",
                            }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center border border-gray-300 rounded-l-md px-3 bg-white flex-1"
                            style={{
                                borderColor: focused ? "#3b82f6" : undefined,
                                transition: "border-color 0.2s",
                            }}
                        >
                            <svg
                                className="w-4 h-4 text-gray-400 mr-2 shrink-0"
                                fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder="Email"
                                className="flex-1 py-2 text-sm outline-none bg-transparent"
                                required
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.04, backgroundColor: "#2563eb" }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="bg-blue-500 text-white px-5 py-2 rounded-r-md text-sm font-medium"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {subscribed ? (
                                    <motion.span
                                        key="done"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        ✓ Done!
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="sub"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        Subscribe
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* ── Main footer — staggered columns ── */}
            <div className="bg-white border-t border-gray-200 py-10">
                <div className="max-w-screen-xl mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
                    >
                        {/* Brand column */}
                        <motion.div variants={columnVariants} className="col-span-2 sm:col-span-3 md:col-span-1">
                            <Link to="/" className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-blue-500">Brand</span>
                            </Link>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                Best information about the company goes here but now lorem ipsum is used.
                            </p>

                            {/* Social icons — each springs on hover */}
                            <div className="flex items-center gap-3">
                                {SOCIAL_ICONS.map(({ label, path }) => (
                                    <motion.a
                                        key={label}
                                        href="#"
                                        aria-label={label}
                                        whileHover={{ scale: 1.2, color: "#3b82f6" }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center
                               justify-center text-gray-400 hover:border-blue-300 transition-colors duration-200"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={path} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Link columns — staggered */}
                        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                            <motion.div key={title} variants={columnVariants}>
                                <h4 className="font-semibold text-gray-800 text-sm mb-3">{title}</h4>
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <motion.a
                                                href="#"
                                                whileHover={{ x: 3, color: "#3b82f6" }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                className="text-xs text-gray-500 transition-colors block"
                                            >
                                                {link}
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}

                        {/* Get app column */}
                        <motion.div variants={columnVariants}>
                            <h4 className="font-semibold text-gray-800 text-sm mb-3">Get app</h4>
                            <div className="flex flex-col gap-2">
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.04, opacity: 0.85 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="block"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                        alt="App Store"
                                        className="h-8"
                                        loading="lazy"
                                    />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.04, opacity: 0.85 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="block"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                        alt="Google Play"
                                        className="h-8"
                                        loading="lazy"
                                    />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="mt-8 pt-6 border-t border-gray-100 text-center"
                    >
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Brand. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}