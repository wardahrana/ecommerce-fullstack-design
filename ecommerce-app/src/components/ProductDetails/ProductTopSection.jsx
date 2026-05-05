import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductTopSection = ({ product }) => {
    const [mainImage, setMainImage] = useState(product.image);
    
    // Mock thumbnails since we only have one image per product in data
    const thumbnails = [
        product.image,
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=150&auto=format&fit=crop"
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
            {/* Gallery */}
            <div className="w-full lg:w-[350px] shrink-0">
                <div className="w-full aspect-square border border-gray-200 rounded-xl mb-3 flex items-center justify-center p-4 bg-white">
                    <img src={mainImage} alt={product.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {thumbnails.map((thumb, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setMainImage(thumb)}
                            className={`w-14 h-14 shrink-0 border rounded-lg p-1 transition-colors ${mainImage === thumb ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover rounded-md" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-500 flex items-center gap-1 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {product.stockStatus}
                    </span>
                </div>
                
                <h1 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{product.title}</h1>
                
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating/2) ? 'text-amber-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-amber-500 font-medium">{product.rating}</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> {product.reviewCount} reviews</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> {product.soldCount} sold</span>
                </div>

                {/* Pricing Tiers */}
                <div className="bg-[#fff7ed] rounded-lg p-3 flex gap-6 mb-4">
                    {product.pricingTiers.map((tier, idx) => (
                        <div key={idx} className={`flex flex-col ${idx !== product.pricingTiers.length - 1 ? 'pr-6 border-r border-orange-200' : ''}`}>
                            <span className={`text-lg font-bold ${idx === 0 ? 'text-red-500' : 'text-gray-900'}`}>${tier.price.toFixed(2)}</span>
                            <span className="text-xs text-gray-500">{tier.minQty}-{tier.maxQty || '+'} pcs</span>
                        </div>
                    ))}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm text-gray-600 mb-auto pb-4 border-b border-gray-100">
                    <span className="text-gray-400">Price:</span><span>Negotiable</span>
                    <span className="text-gray-400">Type:</span><span>{product.type}</span>
                    <span className="text-gray-400">Material:</span><span>{product.material}</span>
                    <span className="text-gray-400">Design:</span><span>{product.design}</span>
                    <div className="col-span-2 my-1 border-b border-gray-100"></div>
                    <span className="text-gray-400">Customization:</span><span className="line-clamp-2">{product.customization}</span>
                    <span className="text-gray-400">Protection:</span><span>{product.protection}</span>
                    <span className="text-gray-400">Warranty:</span><span>{product.warranty}</span>
                </div>
            </div>

            {/* Supplier Card */}
            <div className="w-full lg:w-[280px] shrink-0 border border-gray-200 rounded-xl p-4 self-start">
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded flex items-center justify-center font-bold text-xl uppercase">
                        {product.supplier.name.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Supplier</div>
                        <div className="text-gray-900 font-medium leading-snug">{product.supplier.name}</div>
                    </div>
                </div>

                <div className="space-y-3 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-3">
                        <span>🇩🇪</span><span>{product.supplier.location}</span>
                    </div>
                    {product.supplier.verified && (
                        <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            <span>Verified Seller</span>
                        </div>
                    )}
                    {product.supplier.worldwideShipping && (
                        <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            <span>Worldwide shipping</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-blue-500 text-white font-medium py-2 rounded-md transition-colors hover:bg-blue-600">
                        Send inquiry
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-white text-blue-500 border border-gray-200 font-medium py-2 rounded-md transition-colors hover:bg-gray-50">
                        Seller's profile
                    </motion.button>
                </div>
                
                <div className="text-center">
                    <button className="text-blue-500 text-sm font-medium hover:underline inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        Save for later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductTopSection;
