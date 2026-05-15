import { useState } from "react";
import {
    ShoppingCart,
    User as UserIcon,
    Heart,
    LogOut,
    Settings,
    X,
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

    // Modal State
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // Profile Click Logic (Direct Login Modal trigger)
    const handleProfileClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            setLoginModalOpen(true); // Open Login Modal if no user
        }
    };

    return (
        <>
            <header className="w-full bg-white border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

                    {/* 1. Logo Section */}
                    <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
                        <div className="bg-blue-500 rounded-lg p-2.5 flex items-center justify-center">
                            <ShoppingCart size={22} className="text-white" />
                        </div>
                        <span className="font-bold text-2xl text-[#1c1c1c] tracking-tight">Brand</span>
                    </Link>

                    {/* 2. Search Bar Section (Image Matching) */}
                    <div className="flex-1 max-w-[600px] flex items-stretch border-2 border-[#0d6efd] rounded-lg overflow-hidden h-[44px]">
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 px-4 outline-none border-none text-[15px] text-gray-700 placeholder:text-gray-400"
                        />
                        <button className="bg-[#0d6efd] text-white px-8 border-none cursor-pointer font-semibold hover:bg-blue-600 transition-colors">
                            Search
                        </button>
                    </div>

                    {/* 3. Action Icons Wrapper */}
                    <div className="flex items-center gap-2">

                        {/* --- PROFILE BOX (EXACT MATCH IMAGE 2) --- */}
                        <div className="relative group">
                            <button
                                onClick={handleProfileClick}
                                className="flex flex-col items-center justify-center w-[58px] h-[58px] bg-[#eeeeee] border-none cursor-pointer outline-none rounded-none transition-all hover:bg-gray-200"
                            >
                                <div className="flex items-center justify-center mb-1">
                                    {user ? (
                                        <div className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white text-[10px] flex items-center justify-center font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    ) : (
                                        /* Clean thin stroke for professional look */
                                        <UserIcon size={24} strokeWidth={1.5} className="text-[#8b96a5]" />
                                    )}
                                </div>
                                <span className="text-[11px] font-bold text-[#0067ff] leading-none">
                                    Profile
                                </span>
                            </button>

                            {/* User Dropdown (Visible only when Logged In) */}
                            {user && (
                                <div className="absolute right-0 pt-2 hidden group-hover:block z-50">
                                    <div className="bg-white border border-gray-200 rounded-md shadow-xl py-2 min-w-[170px]">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                            <p className="text-xs text-gray-500 m-0">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-800 m-0 truncate">{user.name}</p>
                                        </div>
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 no-underline transition-colors">
                                            <Settings size={16} className="text-gray-400" /> Account Settings
                                        </Link>
                                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-none bg-transparent cursor-pointer transition-colors">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Orders Button */}
                        <button className="flex flex-col items-center justify-center w-[58px] h-[58px] bg-transparent border-none cursor-pointer text-[#8b96a5] hover:text-blue-600 transition-colors">
                            <Heart size={24} strokeWidth={1.5} />
                            <span className="text-[11px] font-medium mt-1">Orders</span>
                        </button>

                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className="flex flex-col items-center justify-center w-[58px] h-[58px] bg-transparent border-none cursor-pointer text-[#8b96a5] hover:text-blue-600 transition-colors relative"
                        >
                            <ShoppingCart size={24} strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute top-2 right-2 bg-[#0d6efd] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                            <span className="text-[11px] font-medium mt-1">My cart</span>
                        </button>

                    </div>
                </div>
            </header>

            {/* --- MODAL INTEGRATIONS --- */}

            {/* Login Modal: Triggers via handleProfileClick when user is null */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                loginFn={login}
                onSwitchToSignup={() => {
                    setLoginModalOpen(false);
                    // Add signup logic here if you have a separate modal
                }}
            />

            {/* Cart Sidebar Overlay */}
            {cartOpen && (
                <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex justify-end">
                    <div className="w-full max-w-md bg-white h-full relative shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-bold">Your Cart</h2>
                            <button onClick={closeCart} className="p-2 rounded-full hover:bg-gray-100 border-none cursor-pointer text-gray-500">
                                <X size={22} />
                            </button>
                        </div>
                        <div className="h-full overflow-y-auto">
                            <CartPage />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}