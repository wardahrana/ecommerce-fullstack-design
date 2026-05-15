import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import watch from '../../assets/tech/8.jpg';
import camera from '../../assets/tech/6.jpg';
import kettle from '../../assets/tech/10.jpg';
import Gaming from '../../assets/tech/5.jpg';
import Laptop from '../../assets/tech/7.jpg';
import Smartphone from '../../assets/tech/2.jpg';
import Earbuds from '../../assets/tech/9.jpg';
import banner from '../../assets/banner/it.png';

const ELECTRONICS_DATA = [
    { id: "cat-1", name: "Smart watches", priceLabel: "From", priceValue: "USD 19", price: 19, description: "Stylish smartwatch to track your active lifestyle.", category: "Electronics", image: watch },
    { id: "cat-2", name: "Cameras", priceLabel: "From", priceValue: "USD 89", price: 89, description: "Compact camera with excellent zoom capabilities.", category: "Electronics", image: camera },
    { id: "cat-3", name: "Kettle", priceLabel: "From", priceValue: "USD 10", price: 10, description: "Fast-boil electric kettle for your kitchen.", category: "Home Appliances", image: kettle },
    {
        id: "cat-4", name: "Smart watches", priceLabel: "From", priceValue: "USD 90", price: 90, description: "Premium smartwatch with heart-rate monitoring.", category: "Electronics",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80"
    },
    { id: "cat-5", name: "Gaming set", priceLabel: "From", priceValue: "USD 35", price: 35, description: "RGB gaming keyboard and mouse combo.", category: "Accessories", image: Gaming },
    { id: "cat-6", name: "Laptops & PC", priceLabel: "From", priceValue: "USD 340", price: 340, description: "Reliable laptop for productivity and entertainment.", category: "Computers", image: Laptop },
    { id: "cat-7", name: "Smartphones", priceLabel: "From", priceValue: "USD 199", price: 199, description: "Latest generation smartphone with stunning camera.", category: "Electronics", image: Smartphone },
    { id: "cat-8", name: "Earbuds", priceLabel: "From", priceValue: "USD 240", price: 240, description: "True wireless earbuds with active noise cancellation.", category: "Audio", image: Earbuds },
];

const CategoryCards = ({
    title = "Consumer electronics and gadgets",
    products = ELECTRONICS_DATA
}) => {
    return (
        <section className="py-4 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                <div className="bg-white border border-gray-200 rounded-md flex flex-col md:flex-row overflow-hidden shadow-sm">

                    {/* ── LEFT PANEL ── */}
                    <div
                        className="relative w-full md:w-[280px] shrink-0 min-h-[260px] overflow-hidden rounded-xl"
                        style={{ backgroundColor: '#c8dce8' }}
                    >
                        <img
                            src={banner}
                            alt="banner"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <div className="relative z-10 p-5 flex flex-col gap-5">
                            <h3 style={{
                                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                                fontSize: '19px',
                                fontWeight: '700',
                                color: '#111827',
                                lineHeight: '1.35',
                                maxWidth: '145px',
                                margin: 0,
                            }}>
                                {title}
                            </h3>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    alignSelf: 'flex-start',
                                    backgroundColor: '#ffffff',
                                    color: '#111827',
                                    fontSize: '13.5px',
                                    fontWeight: '500',
                                    padding: '9px 18px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                                    cursor: 'pointer',
                                }}
                            >
                                Source now
                            </motion.button>
                        </div>
                    </div>

                    {/* ── RIGHT BLOCK: 8 product cards ── */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-gray-200">
                        {products.map((item, idx) => (
                            <Link 
                                to={`/product/${item.id}`} 
                                state={{ product: item }} 
                                key={item.id || idx}
                                style={{ textDecoration: 'none' }}
                                className="bg-white"
                            >
                                <motion.div
                                    whileHover={{ backgroundColor: "#f8f9fa", zIndex: 10 }}
                                    className="p-4 h-full flex flex-row items-center justify-between cursor-pointer"
                                >
                                    <div className="flex flex-col justify-start">
                                        <h4
                                            className="text-[15px] text-[#1c1c1c] mb-2 leading-snug"
                                            style={{
                                                fontFamily: 'Inter, Segoe UI, sans-serif',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {item.name}
                                        </h4>
                                        <p
                                            className="text-[13px] text-[#8b96a5] leading-[1.6]"
                                            style={{ fontFamily: 'Inter, Segoe UI, sans-serif', fontWeight: 400 }}
                                        >
                                            {item.priceLabel}
                                            <br />
                                            {item.priceValue}
                                        </p>
                                    </div>

                                    <div className="w-[75px] h-[75px] shrink-0 ml-2 flex items-center justify-center">
                                        <motion.img
                                            whileHover={{ scale: 1.12 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            src={item.image}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CategoryCards;