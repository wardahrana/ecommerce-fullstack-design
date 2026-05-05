import React from 'react';
import { motion } from 'framer-motion';

const Pagination = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <select className="appearance-none border border-gray-200 rounded-md py-2 pl-4 pr-8 text-gray-700 bg-white outline-none focus:border-blue-500 text-sm font-medium">
                    <option>Show 10</option>
                    <option>Show 20</option>
                    <option>Show 50</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>

            <div className="flex rounded-md border border-gray-200 bg-white overflow-hidden text-sm font-medium text-gray-700 shadow-sm">
                <motion.button whileHover={{ backgroundColor: '#f9fafb' }} whileTap={{ scale: 0.95 }} className="px-3 py-2 border-r border-gray-200 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>
                <motion.button whileHover={{ backgroundColor: '#f9fafb' }} whileTap={{ scale: 0.95 }} className="px-4 py-2 border-r border-gray-200 bg-gray-100 text-gray-900 font-semibold">
                    1
                </motion.button>
                <motion.button whileHover={{ backgroundColor: '#f9fafb' }} whileTap={{ scale: 0.95 }} className="px-4 py-2 border-r border-gray-200">
                    2
                </motion.button>
                <motion.button whileHover={{ backgroundColor: '#f9fafb' }} whileTap={{ scale: 0.95 }} className="px-4 py-2 border-r border-gray-200">
                    3
                </motion.button>
                <motion.button whileHover={{ backgroundColor: '#f9fafb' }} whileTap={{ scale: 0.95 }} className="px-3 py-2 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
};

export default Pagination;
