import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProductList = ({ products, onEdit, onDelete }) => {
    if (products.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <div className="text-gray-400 text-sm">No products yet. Add your first product.</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">All Products</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {products.length} total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {products.map((product) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg border border-gray-100 flex items-center justify-center bg-white shrink-0 overflow-hidden">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                                                        N/A
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-800 line-clamp-1 max-w-[200px]">
                                                {product.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {product.category || '—'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-gray-900">
                                            ${parseFloat(product.price).toFixed(2)}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-gray-400 line-through ml-2 text-xs">
                                                ${parseFloat(product.oldPrice).toFixed(2)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.stockStatus === 'In Stock'
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : product.stockStatus === 'Limited Stock'
                                                    ? 'bg-amber-50 text-amber-700'
                                                    : 'bg-red-50 text-red-500'
                                            }`}>
                                            {product.stockStatus || 'In Stock'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                onClick={() => onEdit(product)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-blue-500 border border-gray-200 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-50 transition-colors"
                                            >
                                                Edit
                                            </motion.button>
                                            <motion.button
                                                onClick={() => onDelete(product.id)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-red-400 border border-gray-200 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-50 transition-colors"
                                            >
                                                Delete
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductList;