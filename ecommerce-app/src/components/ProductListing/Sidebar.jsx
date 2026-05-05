import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = ({ title, defaultOpen = true, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-t border-gray-200 py-4 first:border-t-0">
            <button
                className="flex items-center justify-between w-full text-left font-semibold text-gray-800 text-sm mb-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="w-4 h-4 text-gray-500"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </motion.svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Sidebar = () => {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });

    return (
        <aside className="w-full lg:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 self-start">
            <FilterSection title="Category">
                <ul className="space-y-3 text-sm text-gray-600 mt-2">
                    {['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'].map(cat => (
                        <motion.li key={cat} whileHover={{ x: 4 }} className="cursor-pointer hover:text-blue-600 transition-colors">
                            {cat}
                        </motion.li>
                    ))}
                    <li className="text-blue-600 cursor-pointer hover:underline mt-1">See all</li>
                </ul>
            </FilterSection>

            <FilterSection title="Brands">
                <div className="space-y-3 mt-2">
                    {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map(brand => (
                        <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors" />
                            <span className="group-hover:text-blue-600 transition-colors">{brand}</span>
                        </label>
                    ))}
                    <div className="text-blue-600 text-sm cursor-pointer hover:underline mt-1">See all</div>
                </div>
            </FilterSection>

            <FilterSection title="Features">
                <div className="space-y-3 mt-2">
                    {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'].map(feature => (
                        <label key={feature} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors" />
                            <span className="group-hover:text-blue-600 transition-colors">{feature}</span>
                        </label>
                    ))}
                    <div className="text-blue-600 text-sm cursor-pointer hover:underline mt-1">See all</div>
                </div>
            </FilterSection>

            <FilterSection title="Price range">
                <div className="mt-2">
                    <div className="relative h-1 bg-gray-200 rounded-full mb-4">
                        <div className="absolute left-[20%] right-[30%] h-full bg-blue-500 rounded-full"></div>
                        <div className="absolute left-[20%] -top-1.5 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow cursor-pointer"></div>
                        <div className="absolute right-[30%] -top-1.5 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow cursor-pointer"></div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 block mb-1">Min</label>
                            <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 block mb-1">Max</label>
                            <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-2 bg-white border border-gray-200 text-blue-600 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
                        Apply
                    </motion.button>
                </div>
            </FilterSection>

            <FilterSection title="Condition">
                <div className="space-y-3 mt-2">
                    {['Any', 'Refurbished', 'Brand new', 'Old items'].map((condition, idx) => (
                        <label key={condition} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
                            <input type="radio" name="condition" defaultChecked={idx === 0} className="border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors" />
                            <span className="group-hover:text-blue-600 transition-colors">{condition}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Ratings">
                <div className="space-y-3 mt-2">
                    {[5, 4, 3, 2].map((stars) => (
                        <label key={stars} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 transition-colors" />
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className={`w-4 h-4 ${star <= stars ? 'text-amber-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </label>
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
};

export default Sidebar;
