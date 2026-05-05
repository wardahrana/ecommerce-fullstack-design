
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { label: "All category", path: "/categories" },
    { label: "Hot offers", path: "/hot-offers" },
    { label: "Gift boxes", path: "/gift-boxes" },
    { label: "Projects", path: "/projects" },
    { label: "Menu item", path: "/menu" },
];

const CATEGORIES = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
];

export default function AppHeader() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All category");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart?.items || []);
    const cartTotalQuantity = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );
    const user = useSelector((state) => state.user?.currentUser ?? null);

    // Scroll effect — transparent → solid
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim())
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-md py-0"
                : "bg-white shadow-sm py-0"
                }`}
        >
            {/* ── Top bar ── */}
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0 group">
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                        </svg>
                    </motion.div>
                    <span className="text-xl font-bold text-blue-500 tracking-tight">Brand</span>
                </Link>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl min-w-0">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="flex-1 border border-r-0 border-gray-300 rounded-l-md px-4 py-2 text-sm outline-none
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 min-w-0"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-x-0 border-gray-300 px-3 py-2 text-sm bg-white outline-none
                       cursor-pointer hidden sm:block hover:bg-gray-50 transition-colors duration-150"
                    >
                        <option>All category</option>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-r-md
                       text-sm font-medium transition-colors duration-150"
                    >
                        Search
                    </motion.button>
                </form>

                {/* Right icons */}
                <div className="flex items-center gap-5 shrink-0 ml-2">

                    {/* Profile */}
                    <Link
                        to={user ? "/profile" : "/login"}
                        className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors group"
                    >
                        <motion.div whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </motion.div>
                        <span className="text-[10px] hidden md:block">Profile</span>
                    </Link>

                    {/* Message */}
                    <Link
                        to="/messages"
                        className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors group"
                    >
                        <motion.div whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                        </motion.div>
                        <span className="text-[10px] hidden md:block">Message</span>
                    </Link>

                    {/* Orders */}
                    <Link
                        to="/orders"
                        className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors group"
                    >
                        <motion.div whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </motion.div>
                        <span className="text-[10px] hidden md:block">Orders</span>
                    </Link>

                    {/* Cart — spring badge */}
                    <Link
                        to="/cart"
                        className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors relative group"
                    >
                        <div className="relative">
                            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </motion.div>

                            <AnimatePresence>
                                {cartTotalQuantity > 0 && (
                                    <motion.span
                                        key={cartTotalQuantity}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.4, 1] }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px]
                               font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md"
                                    >
                                        {cartTotalQuantity > 9 ? "9+" : cartTotalQuantity}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        <span className="text-[10px] hidden md:block">My cart</span>
                    </Link>

                    {/* Hamburger (mobile) */}
                    <motion.button
                        className="md:hidden text-gray-500 hover:text-blue-500 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileMenuOpen ? (
                                <motion.svg
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </motion.svg>
                            ) : (
                                <motion.svg
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </motion.svg>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* ── Bottom nav ── */}
            <nav className="border-t border-gray-100 hidden md:block">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 py-2">
                            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-500
                                 transition-colors font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                All category
                            </button>
                            {NAV_LINKS.slice(1).map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.path}
                                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors
                             whitespace-nowrap relative group"
                                >
                                    {link.label}
                                    {/* Underline slide-in on hover */}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 rounded
                                   transition-all duration-200 group-hover:w-full" />
                                </Link>
                            ))}
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
                                Help
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
                                English, USD
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
                                Ship to 🇩🇪
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Mobile menu — AnimatePresence slide ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
                    >
                        <div className="px-4 py-3 flex flex-col gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.18 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="block text-sm text-gray-700 hover:text-blue-500 transition-colors
                               py-2 border-b border-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}