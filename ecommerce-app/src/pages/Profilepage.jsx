import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, LogOut, Package, MapPin, CreditCard, Loader2, CheckCircle } from "lucide-react";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    // 1. Form State: Initial values user profile se li hain
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    // 2. Load User Data: Jab component load ho ya user change ho
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "+92 ",
                address: user.address || ""
            });
        }
    }, [user]);

    // 3. Handle Input Change: Har key stroke par state update hogi
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 4. Submit to Backend
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const response = await fetch('http://localhost:5000/api/users/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({ type: 'success', msg: 'Profile updated successfully!' });
                setIsEditing(false);
                // Note: Yahan aapko context update karne ki logic bhi daalni chahiye
            } else {
                setStatus({ type: 'error', msg: 'Failed to update profile. Try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Server error. Please check your connection.' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-gray-500 mb-4">Please login to access your profile.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] py-8 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sidebar (Shortened for clarity) */}
                <div className="lg:col-span-3 space-y-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold mb-3">
                            {formData.name?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="font-bold text-gray-900">{formData.name}</h2>
                    </div>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 bg-white border-none cursor-pointer mt-4">
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* Main Form Section */}
                <div className="lg:col-span-9">
                    <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                            <button
                                type="button"
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-sm font-semibold text-blue-600 bg-transparent border-none cursor-pointer"
                            >
                                {isEditing ? "Cancel" : "Edit Details"}
                            </button>
                        </div>

                        <div className="p-8">
                            {/* Status Alerts */}
                            {status.msg && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {status.type === 'success' ? <CheckCircle size={16} /> : null}
                                    {status.msg}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Enter your name"
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${isEditing ? 'border-blue-100 bg-white focus:border-blue-500' : 'border-transparent bg-gray-50 text-gray-500'}`}
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${isEditing ? 'border-blue-100 bg-white focus:border-blue-500' : 'border-transparent bg-gray-50 text-gray-500'}`}
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${isEditing ? 'border-blue-100 bg-white focus:border-blue-500' : 'border-transparent bg-gray-50 text-gray-500'}`}
                                    />
                                </div>

                                {/* Address Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Shipping Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${isEditing ? 'border-blue-100 bg-white focus:border-blue-500' : 'border-transparent bg-gray-50 text-gray-500'}`}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="mt-8 pt-6 border-t border-gray-50">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#1e3a8a] text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition-all border-none cursor-pointer flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}