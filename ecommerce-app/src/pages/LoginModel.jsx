// src/pages/LoginModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ← "from" prop: kept for backward compat but navigation handled by parent if needed
const LoginModal = ({ isOpen, onClose, onSwitchToSignup, loginFn, from = '/' }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState(false);
    const [touched, setTouched] = useState({});

    const firstInputRef = useRef(null);

    const resetForm = () => {
        setFormData({ email: '', password: '' });
        setErrors({});
        setApiError('');
        setShowPassword(false);
        setSuccess(false);
        setTouched({});
    };

    useEffect(() => {
        if (isOpen) {
            resetForm();
            setTimeout(() => firstInputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const validateField = (name, value) => {
        if (name === 'email') {
            if (!value) return 'Email is required';
            return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Enter a valid email' : '';
        }
        if (name === 'password') return !value ? 'Password is required' : '';
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        const e1 = validateField('email', formData.email);
        const e2 = validateField('password', formData.password);
        if (e1 || e2) { setErrors({ email: e1, password: e2 }); return; }

        setLoading(true);
        try {
            // ✅ loginFn calls setUser(data.user) in AuthContext — React will re-render all consumers
            await loginFn(formData.email, formData.password);
            setSuccess(true);

            // ✅ Just close the modal after 1.5s — no navigate()
            // navigate was causing issues when already on the same route (from="/")
            setTimeout(() => {
                onClose();
                resetForm();
                // ✅ Only navigate if going to a DIFFERENT page (e.g. from a product page)
                if (from && from !== '/' && from !== window.location.pathname) {
                    window.location.href = from; // hard redirect only if truly different page
                }
            }, 1500);

        } catch (err) {
            setApiError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#1e3a8a]/40 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800"
            >
                {/* Top Section */}
                <div className="relative bg-[#1e3a8a] pt-12 pb-20 px-8 text-center overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white rounded-full blur-3xl" />
                    </div>

                    <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
                        <X size={24} />
                    </button>

                    <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-4"
                    >
                        <User size={40} className="text-white" />
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white tracking-tight">LOGIN</h2>
                    <p className="text-blue-100/80 text-sm mt-1 font-medium tracking-widest uppercase">To Continue</p>

                    {/* Wavy Bottom */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                        <svg className="relative block w-[200%] h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="currentColor" className="text-white dark:text-gray-900"></path>
                        </svg>
                    </div>
                </div>

                {/* Form Section */}
                <div className="px-10 pb-10 pt-4 bg-white dark:bg-gray-900">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div className="space-y-1">
                            <div className={`relative flex items-center transition-all duration-300 rounded-2xl border-2 ${touched.email && errors.email ? 'border-rose-400' : 'border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white'}`}>
                                <div className="pl-4 text-gray-400"><Mail size={20} /></div>
                                <input
                                    ref={firstInputRef}
                                    type="email"
                                    name="email"
                                    placeholder="someone@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={() => setTouched(p => ({ ...p, email: true }))}
                                    className="w-full p-4 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                />
                            </div>
                            {touched.email && errors.email && (
                                <p className="text-xs text-rose-500 pl-2">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className={`relative flex items-center transition-all duration-300 rounded-2xl border-2 ${touched.password && errors.password ? 'border-rose-400' : 'border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white'}`}>
                                <div className="pl-4 text-gray-400"><Lock size={20} /></div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="••••••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={() => setTouched(p => ({ ...p, password: true }))}
                                    className="w-full p-4 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-gray-400 hover:text-[#1e3a8a]">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {touched.password && errors.password && (
                                <p className="text-xs text-rose-500 pl-2">{errors.password}</p>
                            )}
                        </div>

                        {/* Status Messages */}
                        <AnimatePresence>
                            {(apiError || success) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className={`flex items-center gap-2 p-3 rounded-xl text-sm ${success ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                                >
                                    {success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                    <span>{success ? 'Login successful! Welcome back!' : apiError}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full mt-2 bg-[#1e3a8a] hover:bg-[#162a63] text-white py-4 rounded-2xl font-bold tracking-widest uppercase text-sm shadow-[0_10px_20px_rgba(30,58,138,0.3)] transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading
                                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : success
                                    ? <>Welcome Back <Sparkles size={18} /></>
                                    : 'LOGIN'
                            }
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-6 uppercase tracking-wider font-semibold">
                            New here?
                            <button
                                type="button"
                                onClick={() => { resetForm(); onSwitchToSignup(); }}
                                className="text-[#1e3a8a] ml-2 hover:underline"
                            >
                                Create Account
                            </button>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginModal;