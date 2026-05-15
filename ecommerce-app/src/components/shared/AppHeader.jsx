import { useState } from "react";
import {
    ShoppingCart,
    User as UserIcon,
    Heart,
    LogOut,
    Settings,
    X,
    Menu,
    ChevronDown,
    MessageSquare
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import LoginModal from "../../pages/LoginModel";
import CartPage from "../../pages/CartPage";

export default function AppHeader() {
    const { user, logout, login } = useAuth();
    const navigate = useNavigate();
    const { totalItems, cartOpen, toggleCart, closeCart } = useCart();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleProfileClick = () => {
        if (user) navigate("/profile");
        else setLoginModalOpen(true);
    };

    return (
        <>
            <header className="w-full bg-white border-b border-gray-200 font-sans">
                {/* --- MAIN HEADER (Top Row) --- */}
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-8">

                    {/* 1. Logo */}
                    <Link to="/" className="flex items-center gap-3 no-underline shrink-0">
                        <div className="bg-[#0d6efd] rounded-md p-2 flex items-center justify-center shadow-sm">
                            <ShoppingCart size={24} className="text-white" />
                        </div>
                        <span className="font-bold text-[28px] text-[#4ca7f8] tracking-tight">Brand</span>
                    </Link>

                    {/* 2. Search Bar (Exact Image Match) */}
                    <div className="flex-1 max-w-[660px] flex items-stretch border-2 border-[#0d6efd] rounded-lg overflow-hidden h-[46px]">
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 px-4 outline-none border-none text-[16px] text-gray-700"
                        />
                        <div className="relative border-l border-gray-300 bg-white px-4 flex items-center cursor-pointer group">
                            <span className="text-[15px] text-gray-700 mr-2">All category</span>
                            <ChevronDown size={16} className="text-gray-500" />
                        </div>
                        <button className="bg-[#0d6efd] text-white px-9 border-none cursor-pointer font-semibold text-[16px] hover:bg-blue-600 transition-colors">
                            Search
                        </button>
                    </div>

                    {/* 3. Action Icons */}
                    <div className="flex items-center gap-1">
                        {/* Profile */}
                        <div className="flex flex-col items-center group cursor-pointer px-3" onClick={handleProfileClick}>
                            <UserIcon size={22} className="text-[#8b96a5]" strokeWidth={2} />
                            <span className="text-[12px] text-[#8b96a5] mt-1">Profile</span>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col items-center cursor-pointer px-3">
                            <MessageSquare size={22} className="text-[#8b96a5]" strokeWidth={2} />
                            <span className="text-[12px] text-[#8b96a5] mt-1">Message</span>
                        </div>

                        {/* Orders */}
                        <div className="flex flex-col items-center cursor-pointer px-3">
                            <Heart size={22} className="text-[#8b96a5]" strokeWidth={2} />
                            <span className="text-[12px] text-[#8b96a5] mt-1">Orders</span>
                        </div>

                        {/* Cart */}
                        <div className="flex flex-col items-center cursor-pointer px-3 relative" onClick={toggleCart}>
                            <ShoppingCart size={22} className="text-[#8b96a5]" strokeWidth={2} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 right-2 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                    {totalItems}
                                </span>
                            )}
                            <span className="text-[12px] text-[#8b96a5] mt-1">My cart</span>
                        </div>
                    </div>
                </div>

                {/* --- SECONDARY NAVIGATION (Bottom Row from Image 2) --- */}
                <div className="border-t border-gray-200 bg-white">
                    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between text-[16px] font-medium text-[#1c1c1c]">

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Menu size={20} />
                                <span>All category</span>
                            </div>
                            <span className="cursor-pointer hover:text-blue-600">Hot offers</span>
                            <span className="cursor-pointer hover:text-blue-600">Gift boxes</span>
                            <span className="cursor-pointer hover:text-blue-600">Projects</span>
                            <span className="cursor-pointer hover:text-blue-600">Menu item</span>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <span>Help</span>
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <span>English, USD</span>
                                <ChevronDown size={16} />
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <span>Ship to</span>
                                <img src="https://flagcdn.com/w20/de.png" alt="Germany" className="w-5 h-3" />
                                <ChevronDown size={16} />
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                loginFn={login}
            />

            {/* Cart Sidebar */}
            {cartOpen && (
                <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex justify-end" onClick={closeCart}>
                    <div className="w-full max-w-md bg-white h-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-bold">Your Cart</h2>
                            <button onClick={closeCart} className="p-2 rounded-full hover:bg-gray-100 border-none cursor-pointer text-gray-500">
                                <X size={22} />
                            </button>
                        </div>
                        <div className="h-[calc(100vh-70px)] overflow-y-auto">
                            <CartPage />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}