// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/api';
import { motion } from 'framer-motion';
import { LogOut, User, Mail, ShoppingBag, Heart, Settings, ChevronRight } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            navigate('/');
            return;
        }
        setUser(currentUser);
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-6 mb-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                                {user.role || 'Member'}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Menu Items */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <ShoppingBag size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-700">My Orders</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <Heart size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-700">Wishlist</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Settings size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-700">Settings</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </button>
                </div>

                {/* Logout Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleLogout}
                    className="mt-6 w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
                >
                    <LogOut size={20} />
                    Logout
                </motion.button>
            </div>
        </div>
    );
};

export default ProfilePage;