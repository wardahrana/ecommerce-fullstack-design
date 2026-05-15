// src/components/layout/AppHeader.jsx
import { useState } from "react";
import {
    ShoppingCart,
    User,
    MessageSquare,
    Heart,
    ChevronDown,
    Menu,
    LogOut,
    X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartPage from "../../pages/CartPage";
import germanyFlag from "../../assets/flags/DE.png";

const CATEGORIES = [
    "All category", "Electronics", "Fashion", "Home & Garden",
    "Sports", "Toys", "Automotive", "Books",
];

const NAV_ITEMS = [
    { label: "Hot offers", href: "#" },
    { label: "Gift boxes", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Menu item", href: "#" },
];

const LANGUAGES = [
    { label: "English, USD", value: "en-usd" },
    { label: "Arabic, AED", value: "ar-aed" },
    { label: "French, EUR", value: "fr-eur" },
];

const SHIP_TO_OPTIONS = [
    { label: "Germany", flag: germanyFlag, value: "de" },
];

export default function AppHeader() {
    // ✅ user is live from context — any setUser() call in AuthContext re-renders this component
    const { user, logout } = useAuth();
    const { totalItems, cartOpen, toggleCart, closeCart } = useCart();

    const [selectedCategory, setSelectedCategory] = useState("All category");
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [langOpen, setLangOpen] = useState(false);
    const [shipOpen, setShipOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const [selectedShip, setSelectedShip] = useState(SHIP_TO_OPTIONS[0]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeAll = () => {
        setCategoryOpen(false);
        setLangOpen(false);
        setShipOpen(false);
        setHelpOpen(false);
    };

    // ✅ firstName: live from user object — updates the moment context changes
    const firstName = user?.name?.split(" ")[0] || "";

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <header className="w-full bg-white" style={{ boxShadow: "0 1px 0 #e8e8e8" }}>

                {/* ── TOP BAR ── */}
                <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 flex-shrink-0" style={{ textDecoration: "none" }}>
                        <div className="bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: 38, height: 38 }}>
                            <ShoppingCart size={19} className="text-white" strokeWidth={2} />
                        </div>
                        <span className="font-bold text-black" style={{ fontSize: "1.2rem" }}>Brand</span>
                    </a>

                    {/* Search Bar */}
                    <div
                        className="flex items-center"
                        style={{
                            flex: 1, maxWidth: "500px", minWidth: "300px",
                            border: "1.5px solid #3b82f6", borderRadius: 8,
                            overflow: "hidden", backgroundColor: "white",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-white outline-none text-sm text-black placeholder-gray-400"
                            style={{ padding: "12px 16px", minWidth: 0, border: "none", fontSize: "14px" }}
                        />
                        <div style={{ width: 1, height: 28, background: "#d1d5db", flexShrink: 0 }} />

                        {/* Category Dropdown */}
                        <div className="relative flex-shrink-0">
                            <button
                                onClick={() => { closeAll(); setCategoryOpen((v) => !v); }}
                                className="flex items-center gap-1.5 bg-white text-sm text-black hover:bg-gray-50 transition-colors whitespace-nowrap"
                                style={{ padding: "12px 16px", border: "none", cursor: "pointer", fontWeight: 500 }}
                            >
                                {selectedCategory}
                                <ChevronDown size={14} className="text-gray-400"
                                    style={{ transform: categoryOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                                />
                            </button>
                            {categoryOpen && (
                                <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
                                    style={{ top: "calc(100% + 4px)", left: 0, minWidth: 180 }}>
                                    {CATEGORIES.map((cat) => (
                                        <button key={cat}
                                            onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 ${selectedCategory === cat ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700"}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex-shrink-0"
                            style={{ padding: "12px 24px", border: "none", cursor: "pointer" }}>
                            Search
                        </button>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-5 flex-shrink-0">

                        {/* ✅ Profile Icon — reactively shows first letter when user logs in */}
                        <div className="relative group">
                            <button
                                className="flex flex-col items-center gap-0.5 text-black hover:text-blue-500 transition-colors"
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                            >
                                {user ? (
                                    // ✅ Logged in: dark blue circle with first letter of name
                                    <div
                                        className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-white font-bold"
                                        style={{ fontSize: 11, backgroundColor: "#1e3a8a" }}
                                    >
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    // Logged out: generic User icon
                                    <User size={22} strokeWidth={1.5} />
                                )}
                                {/* ✅ Label: firstName when logged in, "Profile" when logged out */}
                                <span style={{
                                    fontSize: 11, lineHeight: 1.3, color: "black",
                                    maxWidth: 60, overflow: "hidden",
                                    textOverflow: "ellipsis", whiteSpace: "nowrap"
                                }}>
                                    {user ? firstName : "Profile"}
                                </span>
                            </button>

                            {/* ✅ Hover dropdown — only when logged in */}
                            {user && (
                                <div className="absolute right-0 pt-2 hidden group-hover:block z-50">
                                    <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[140px]">
                                        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100 truncate">
                                            {user.name}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Message */}
                        <button className="flex flex-col items-center gap-0.5 text-black hover:text-blue-500 transition-colors"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                            <MessageSquare size={22} strokeWidth={1.5} />
                            <span style={{ fontSize: 11, lineHeight: 1.3, color: "black" }}>Message</span>
                        </button>

                        {/* Orders */}
                        <button className="flex flex-col items-center gap-0.5 text-black hover:text-blue-500 transition-colors"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                            <Heart size={22} strokeWidth={1.5} />
                            <span style={{ fontSize: 11, lineHeight: 1.3, color: "black" }}>Orders</span>
                        </button>

                        {/* Cart */}
                        <button
                            onClick={toggleCart}
                            className="flex flex-col items-center gap-0.5 text-black hover:text-blue-500 transition-colors relative"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <div className="relative">
                                <ShoppingCart size={22} strokeWidth={1.5} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                                        style={{ minWidth: 17, height: 17, padding: "0 3px", lineHeight: 1 }}>
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </span>
                                )}
                            </div>
                            <span style={{ fontSize: 11, lineHeight: 1.3, color: "black" }}>My cart</span>
                        </button>
                    </div>
                </div>

                <div style={{ height: 1, background: "#e8e8e8" }} />

                {/* ── BOTTOM NAV ── */}
                <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between" style={{ height: 44 }}>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="flex items-center gap-2 text-sm font-medium text-black hover:text-blue-500 transition-colors flex-shrink-0"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <Menu size={17} strokeWidth={2} />
                            <span>All category</span>
                        </button>
                        <div style={{ width: 1, height: 20, background: "#e0e0e0" }} />
                    </div>

                    <nav className="flex items-center gap-6">
                        {NAV_ITEMS.map(({ label, href }) => (
                            <a key={label} href={href}
                                className="text-sm text-black hover:text-blue-500 transition-colors whitespace-nowrap"
                                style={{ textDecoration: "none" }}>
                                {label}
                            </a>
                        ))}
                        <div className="relative">
                            <button
                                onClick={() => { closeAll(); setHelpOpen((v) => !v); }}
                                className="flex items-center gap-1 text-sm text-black hover:text-blue-500 transition-colors"
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                            >
                                Help
                                <ChevronDown size={13} className="text-gray-400"
                                    style={{ transform: helpOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                            </button>
                            {helpOpen && (
                                <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
                                    style={{ top: "calc(100% + 6px)", left: 0, minWidth: 160 }}>
                                    {["FAQ", "Contact Us", "Returns", "Shipping Info"].map((item) => (
                                        <a key={item} href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            style={{ textDecoration: "none" }}>
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="flex items-center gap-5 flex-shrink-0">
                        {/* Language */}
                        <div className="relative">
                            <button
                                onClick={() => { closeAll(); setLangOpen((v) => !v); }}
                                className="flex items-center gap-1 text-sm text-black hover:text-blue-500 transition-colors whitespace-nowrap"
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                            >
                                {selectedLang.label}
                                <ChevronDown size={13} className="text-gray-400"
                                    style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                            </button>
                            {langOpen && (
                                <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
                                    style={{ top: "calc(100% + 6px)", right: 0, minWidth: 160 }}>
                                    {LANGUAGES.map((lang) => (
                                        <button key={lang.value}
                                            onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${selectedLang.value === lang.value ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700"}`}>
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Ship To */}
                        <div className="relative">
                            <button
                                onClick={() => { closeAll(); setShipOpen((v) => !v); }}
                                className="flex items-center gap-1.5 text-sm text-black hover:text-blue-500 transition-colors whitespace-nowrap"
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                            >
                                <span>Ship to</span>
                                <img src={selectedShip.flag} alt={selectedShip.label}
                                    style={{ width: 22, height: 15, objectFit: "cover", borderRadius: 2, display: "block" }}
                                    onError={(e) => { e.target.style.display = "none"; }} />
                                <ChevronDown size={13} className="text-gray-400"
                                    style={{ transform: shipOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                            </button>
                            {shipOpen && (
                                <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
                                    style={{ top: "calc(100% + 6px)", right: 0, minWidth: 180 }}>
                                    {SHIP_TO_OPTIONS.map((country) => (
                                        <button key={country.value}
                                            onClick={() => { setSelectedShip(country); setShipOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${selectedShip.value === country.value ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700"}`}>
                                            <img src={country.flag} alt={country.label}
                                                style={{ width: 22, height: 15, objectFit: "cover", borderRadius: 2 }}
                                                onError={(e) => { e.target.style.display = "none"; }} />
                                            {country.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden bg-white flex flex-col"
                        style={{ borderTop: "1px solid #e8e8e8", padding: "8px 24px 12px" }}>
                        {NAV_ITEMS.map(({ label, href }) => (
                            <a key={label} href={href}
                                className="py-2 text-sm text-black hover:text-blue-500 transition-colors"
                                style={{ textDecoration: "none", borderBottom: "1px solid #f3f4f6" }}>
                                {label}
                            </a>
                        ))}
                        <a href="#" className="py-2 text-sm text-black hover:text-blue-500 transition-colors"
                            style={{ textDecoration: "none" }}>Help</a>
                    </div>
                )}
            </header>

            {/* Cart Overlay */}
            {cartOpen && (
                <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
                    <button
                        onClick={closeCart}
                        className="fixed top-4 right-4 z-[110] bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                    <CartPage />
                </div>
            )}
        </>
    );
}