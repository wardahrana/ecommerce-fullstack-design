import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Plus, X, Package, DollarSign, Image as ImageIcon, Tag, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        stock: ''
    });
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState(false);

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAll();
            setProducts(data || []);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({ name: '', price: '', description: '', image: '', category: '', stock: '' });
        setApiError('');
        setSuccess(false);
    };

    const handleOpenModal = (product = null) => {
        resetForm();
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name || '',
                price: product.price || '',
                description: product.description || '',
                image: product.image || '',
                category: product.category || '',
                stock: product.stock || ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(resetForm, 300);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (apiError) setApiError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError('');

        try {
            if (editingProduct) {
                // Ensure id field is passed if required by the backend, or use _id for mongodb
                const id = editingProduct.id || editingProduct._id;
                await productService.update(id, formData);
            } else {
                await productService.create(formData);
            }
            setSuccess(true);
            loadProducts();
            setTimeout(() => {
                handleCloseModal();
            }, 1500);
        } catch (error) {
            setApiError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            try {
                const id = product.id || product._id;
                await productService.delete(id);
                loadProducts();
            } catch (error) {
                alert('Failed to delete product: ' + error.message);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Package className="text-[#1e3a8a]" />
                            Product Management
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your store inventory</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigate('/')} 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                        >
                            View Site
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors shadow-sm"
                        >
                            Logout
                        </button>
                        <button 
                            onClick={() => handleOpenModal()} 
                            className="px-4 py-2 text-sm font-bold text-white bg-[#1e3a8a] hover:bg-[#162a63] rounded-xl transition-all shadow-[0_4px_10px_rgba(30,58,138,0.2)] flex items-center gap-2 active:scale-95"
                        >
                            <Plus size={16} /> Add Product
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Product</th>
                                    <th className="p-4 font-semibold">Category</th>
                                    <th className="p-4 font-semibold">Price</th>
                                    <th className="p-4 font-semibold">Stock</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {products.map((product) => (
                                    <motion.tr 
                                        key={product._id || product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors group"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={product.image || 'https://via.placeholder.com/150'} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                {product.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                                            Rs {product.price}
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-sm ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                {product.stock || 0} in stock
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleOpenModal(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(product)}
                                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">
                                            No products found. Add some to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-[#1e3a8a]/40 backdrop-blur-sm"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800"
                        >
                            {/* Top Section with Dark Blue Theme */}
                            <div className="relative bg-[#1e3a8a] pt-10 pb-16 px-8 text-center overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                    <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white rounded-full blur-3xl" />
                                </div>

                                <button onClick={handleCloseModal} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>

                                <motion.div
                                    initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-4"
                                >
                                    <Package size={32} className="text-white" />
                                </motion.div>

                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    {editingProduct ? 'EDIT PRODUCT' : 'NEW PRODUCT'}
                                </h2>

                                {/* Wavy Bottom Decoration */}
                                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                                    <svg className="relative block w-[200%] h-[40px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="currentColor" className="text-white dark:text-gray-900"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="px-8 pb-8 pt-2 bg-white dark:bg-gray-900 max-h-[60vh] overflow-y-auto scrollbar-hide">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="relative flex items-center transition-all duration-300 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white">
                                            <div className="pl-4 text-gray-400"><Tag size={18} /></div>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Product Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="space-y-1 flex-1">
                                            <div className="relative flex items-center transition-all duration-300 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white">
                                                <div className="pl-4 text-gray-400"><DollarSign size={18} /></div>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    placeholder="Price (Rs)"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <div className="relative flex items-center transition-all duration-300 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white">
                                                <div className="pl-4 text-gray-400"><Package size={18} /></div>
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    placeholder="Stock"
                                                    value={formData.stock}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative flex items-center transition-all duration-300 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white">
                                            <div className="pl-4 text-gray-400"><Tag size={18} /></div>
                                            <input
                                                type="text"
                                                name="category"
                                                placeholder="Category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative flex items-center transition-all duration-300 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white">
                                            <div className="pl-4 text-gray-400"><ImageIcon size={18} /></div>
                                            <input
                                                type="text"
                                                name="image"
                                                placeholder="Image URL"
                                                value={formData.image}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative flex items-start transition-all duration-300 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#1e3a8a] focus-within:bg-white pt-3">
                                            <div className="pl-4 text-gray-400"><FileText size={18} /></div>
                                            <textarea
                                                name="description"
                                                placeholder="Description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                                className="w-full px-3 pb-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm resize-none"
                                            />
                                        </div>
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
                                                <span>{success ? 'Saved successfully!' : apiError}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading || success}
                                        className="w-full mt-4 bg-[#1e3a8a] hover:bg-[#162a63] text-white py-4 rounded-2xl font-bold tracking-widest uppercase text-sm shadow-[0_10px_20px_rgba(30,58,138,0.3)] transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                                            success ? <>Saved <CheckCircle size={18} /></> : 'SAVE PRODUCT'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPage;