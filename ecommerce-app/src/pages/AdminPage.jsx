import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import {
    Plus, Trash2, Edit, Package, LayoutGrid, X,
    Search, RefreshCcw, Upload, Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadType, setUploadType] = useState('upload'); // 'upload' or 'url'

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        componentType: 'recommended',
        discount: ''
    });

    useEffect(() => {
        loadData();
        window.addEventListener('productsUpdated', loadData);
        return () => window.removeEventListener('productsUpdated', loadData);
    }, []);

    const loadData = async () => {
        const data = await productService.getAll();
        setProducts(data);
    };

    // File to Base64 conversion
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        await productService.create(newProduct);
        setIsModalOpen(false);
        setNewProduct({
            name: '', price: '', category: '', image: '',
            componentType: 'recommended', discount: ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await productService.delete(id);
        }
    };

    const resetToDefault = () => {
        if (window.confirm("This will delete all changes and restore original images. Proceed?")) {
            localStorage.removeItem('app_products');
            window.location.reload();
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic">Inventory Dashboard</h1>
                    <p className="text-gray-500 font-medium">Manage your assets and sections</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={resetToDefault}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-pink-100 text-pink-400 rounded-xl hover:bg-pink-50 transition-all font-bold"
                    >
                        <RefreshCcw size={18} /> Reset
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#A7D7C5] text-white rounded-xl shadow-lg shadow-mint-100 hover:bg-[#8ec2af] transition-all font-bold"
                    >
                        <Plus size={20} /> Add New
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-mint-50 rounded-lg text-[#A7D7C5]"><Package size={24} /></div>
                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Products</h3>
                        <p className="text-2xl font-black text-gray-800">{products.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-pink-50 rounded-lg text-pink-300"><LayoutGrid size={24} /></div>
                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Layouts</h3>
                        <p className="text-2xl font-black text-gray-800">Dynamic</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                    <Search className="text-gray-300" size={20} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="flex-1 outline-none text-gray-600 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto font-medium">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase">Product</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase">Location</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase">Price</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <img src={p.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" alt="" />
                                            <p className="font-bold text-gray-800">{p.name}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold capitalize">
                                            {p.componentType}
                                        </span>
                                    </td>
                                    <td className="p-6 font-bold text-gray-700">Rs {p.price}</td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="p-2 text-gray-300 hover:text-pink-400 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl p-8 overflow-hidden"
                        >
                            <h2 className="text-2xl font-black text-gray-800 mb-6 italic">Add Product</h2>

                            <form onSubmit={handleAddProduct} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        required className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium text-sm"
                                        placeholder="Name"
                                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                    <input
                                        type="number" required className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium text-sm"
                                        placeholder="Price (Rs)"
                                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>

                                <select
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium text-sm appearance-none"
                                    onChange={e => setNewProduct({ ...newProduct, componentType: e.target.value })}
                                >
                                    <option value="featured">Featured Deals</option>
                                    <option value="homeAndOutdoor">Home & Outdoor</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="recommended">Recommended</option>
                                </select>

                                {/* Image Source Tabs */}
                                <div className="space-y-3">
                                    <div className="flex bg-gray-100 p-1 rounded-xl">
                                        <button
                                            type="button" onClick={() => setUploadType('upload')}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${uploadType === 'upload' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                                        >
                                            Upload File
                                        </button>
                                        <button
                                            type="button" onClick={() => setUploadType('url')}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${uploadType === 'url' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                                        >
                                            Image URL
                                        </button>
                                    </div>

                                    {uploadType === 'upload' ? (
                                        <div className="relative h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden group">
                                            {newProduct.image && uploadType === 'upload' ? (
                                                <img src={newProduct.image} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <div className="text-center">
                                                    <Upload size={20} className="mx-auto text-gray-300 mb-1" />
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Choose Image</p>
                                                </div>
                                            )}
                                            <input
                                                type="file" accept="image/*" onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium text-xs"
                                            placeholder="https://example.com/image.jpg"
                                            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                        />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#A7D7C5] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-[#96c5b4] transition-all mt-4"
                                >
                                    Publish Item
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;