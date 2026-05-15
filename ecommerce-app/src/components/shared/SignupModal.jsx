// src/components/shared/SignupModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin, signupFn }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setApiError('');
    setSuccess(false);
    setTouched({});
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
      resetForm();
    }
  }, [isOpen]);

  const validateField = (name, value) => {
    if (name === 'name' && !value) return 'Full name is required';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    if (name === 'password' && value.length < 6) return 'Password too short';
    if (name === 'confirmPassword' && value !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    try {
      await signupFn(formData);
      // ✅ signupFn already calls setUser in AuthContext
      // Show success briefly then close — parent HeroSection will re-render via context
      setSuccess(true);
      setTimeout(() => {
        onClose();   // close modal
        resetForm(); // clean up form state
      }, 1500);
    } catch (err) {
      setApiError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1e3a8a]/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-100"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#1e3a8a] z-50">
              <X size={20} />
            </button>

            <div className="p-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#1e3a8a] tracking-tight uppercase">Join Us</h2>
                <p className="text-gray-400 text-sm mt-1">Create your professional account</p>
              </div>

              {success ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                  <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Welcome aboard!</h3>
                  <p className="text-gray-500 mt-1">Your account has been created.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3a8a]" size={18} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1e3a8a] transition-all outline-none"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3a8a]" size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1e3a8a] transition-all outline-none"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3a8a]" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1e3a8a] transition-all outline-none"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {apiError && (
                    <p className="text-red-500 text-xs text-center bg-red-50 py-2 px-3 rounded-xl">{apiError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-[#1e3a8a]/30 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <button type="button" onClick={onSwitchToLogin} className="text-[#1e3a8a] font-bold hover:underline">
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </div>

            <div className="h-4 bg-[#1e3a8a] w-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;