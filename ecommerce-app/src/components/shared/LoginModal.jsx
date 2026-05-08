import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { loginUser } from '../../services/api';
import { useCart } from '../../context/CartContext';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup, onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const { syncCart } = useCart();

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
    setApiError('');
    setShowPassword(false);
    setSuccess(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        resetForm();
        onClose();
      }
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable && focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
          else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      return !validateEmail(value) ? 'Invalid email format' : '';
    }
    if (name === 'password') return !value ? 'Password is required' : '';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (apiError) setApiError('');
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) return;

    setLoading(true);
    setApiError('');
    try {
      const response = await loginUser(formData.email, formData.password);
      setSuccess(true);
      if (syncCart) await syncCart();
      if (onSuccess) onSuccess(response);
      setTimeout(() => { resetForm(); onClose(); }, 1500);
    } catch (err) {
      setApiError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { resetForm(); onClose(); };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300, staggerChildren: 0.1, delayChildren: 0.1 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } }
  };
  const shakeAnimation = { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" variants={backdropVariants} initial="hidden" animate="visible" exit="exit" onClick={handleClose} aria-hidden="true" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div ref={modalRef} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto relative" role="dialog" aria-modal="true" variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors z-10"><X size={20} /></button>
              <div className="p-6 sm:p-8">
                <motion.div variants={itemVariants} className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Login to your account</p>
                </motion.div>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate autoComplete="off">
                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500"><Mail size={18} /></div>
                      <input ref={firstInputRef} type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} autoComplete="off" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                    </div>
                    {errors.email && <motion.p className="text-red-500 text-xs mt-1" animate={shakeAnimation}>{errors.email}</motion.p>}
                  </motion.div>
                  {/* Password */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500"><Lock size={18} /></div>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password" placeholder="Enter your password" className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                    {errors.password && <motion.p className="text-red-500 text-xs mt-1" animate={shakeAnimation}>{errors.password}</motion.p>}
                  </motion.div>
                  {apiError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm"><AlertCircle size={16} />{apiError}</motion.div>}
                  <motion.button type="submit" disabled={loading || success} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : success ? "Login Successful!" : <><LogIn size={18} />Login</>}
                  </motion.button>
                  <p className="text-center text-sm text-gray-500">Don't have an account? <button type="button" onClick={() => { resetForm(); onSwitchToSignup(); }} className="text-blue-600 font-medium">Sign up</button></p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;