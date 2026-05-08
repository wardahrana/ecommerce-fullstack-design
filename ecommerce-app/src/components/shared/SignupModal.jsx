import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { signupUser } from '../../services/api';

const SignupModal = ({ isOpen, onClose, onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
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
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
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
    switch (name) {
      case 'name': return !value.trim() ? 'Name is required' : '';
      case 'email':
        if (!value) return 'Email is required';
        return !validateEmail(value) ? 'Invalid email format' : '';
      case 'password':
        if (!value) return 'Password is required';
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      default: return '';
    }
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
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) return;

    setLoading(true);
    setApiError('');
    try {
      const response = await signupUser(formData);
      setSuccess(true);
      if (onSuccess) onSuccess(response);
      setTimeout(() => { resetForm(); onClose(); }, 1500);
    } catch (err) {
      setApiError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

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
          <motion.div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" variants={backdropVariants} initial="hidden" animate="visible" exit="exit" onClick={() => { resetForm(); onClose(); }} aria-hidden="true" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div ref={modalRef} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto relative" role="dialog" aria-modal="true" variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <button onClick={() => { resetForm(); onClose(); }} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10" aria-label="Close modal"><X size={20} /></button>
              <div className="p-6 sm:p-8">
                <motion.div variants={itemVariants} className="text-center mb-8">
                  <h2 id="signup-modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Join us for an exclusive shopping experience.</p>
                </motion.div>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate autoComplete="off">
                  {/* Name */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500"><User size={18} /></div>
                      <input ref={firstInputRef} type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} autoComplete="off" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="John Doe" required />
                    </div>
                    <AnimatePresence>{errors.name && <motion.p className="text-red-500 text-xs mt-1" animate={shakeAnimation}>{errors.name}</motion.p>}</AnimatePresence>
                  </motion.div>
                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500"><Mail size={18} /></div>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} autoComplete="off" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="you@example.com" required />
                    </div>
                    <AnimatePresence>{errors.email && <motion.p className="text-red-500 text-xs mt-1" animate={shakeAnimation}>{errors.email}</motion.p>}</AnimatePresence>
                  </motion.div>
                  {/* Password */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500"><Lock size={18} /></div>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password" className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="••••••••" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                    <AnimatePresence>{errors.password && <motion.p className="text-red-500 text-xs mt-1" animate={shakeAnimation}>{errors.password}</motion.p>}</AnimatePresence>
                  </motion.div>
                  {/* API error */}
                  <AnimatePresence>{apiError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm"><AlertCircle size={16} />{apiError}</motion.div>}</AnimatePresence>
                  {/* Submit */}
                  <motion.button type="submit" disabled={loading || success} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full py-3.5 rounded-lg font-bold text-white transition ${success ? 'bg-green-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} ${loading ? 'opacity-90 cursor-wait' : ''}`}>
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : success ? <span className="flex items-center justify-center gap-2"><CheckCircle size={20} />Account Created!</span> : 'Sign Up'}
                  </motion.button>
                  <p className="text-center text-sm text-gray-500">Already have an account? <button type="button" onClick={() => { resetForm(); onSwitchToLogin(); }} className="text-blue-600 font-medium">Log in</button></p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;