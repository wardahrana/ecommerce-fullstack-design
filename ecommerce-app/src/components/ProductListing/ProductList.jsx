import React from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { PRODUCTS } from '../../data/products';

const ProductList = () => {
    return (
        <div className="flex-1 w-full">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm gap-4">
                <div className="text-gray-800 font-medium">
                    12,911 items in <span className="font-bold text-gray-900">Mobile accessory</span>
                </div>
                <div className="flex items-center gap-4 text-sm w-full sm:w-auto">
                    <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                        Verified only
                    </label>
                    <select className="border border-gray-200 rounded-md py-1.5 px-3 text-gray-700 bg-white outline-none focus:border-blue-500">
                        <option>Featured</option>
                        <option>Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                    <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white">
                        <button className="p-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-200 bg-gray-100 shadow-inner">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:bg-gray-50">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <div className="flex flex-col gap-4">
                {PRODUCTS.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-end">
                <Pagination />
            </div>
        </div>
    );
};

export default ProductList;
