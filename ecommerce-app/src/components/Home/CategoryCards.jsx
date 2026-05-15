import React, { useState, useEffect } from 'react'; // Hooks add kiye
import axios from 'axios'; // Axios add kiya
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Purane assets ko as a fallback rakhein (agar DB khali ho)
import watch from '../../assets/tech/8.jpg';
import camera from '../../assets/tech/6.jpg';
import banner from '../../assets/banner/it.png';

const CategoryCards = ({ title = "Consumer electronics and gadgets" }) => {
    // 1. State banayein products ke liye
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Database se data mangwane ka function
    useEffect(() => {
        const fetchElectronics = async () => {
            try {
                // Humne backend mein filter lagaya tha ?type= categoryCards
                const response = await axios.get('http://localhost:5000/api/products?type=categoryCards');

                // Agar DB mein data hai toh wo dikhayein, warna static data dikhayein
                if (response.data.length > 0) {
                    setProducts(response.data);
                } else {
                    // Agar database khali hai, toh empty array ya static data set karein
                    setProducts([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching electronics:", error);
                setLoading(false);
            }
        };

        fetchElectronics();
    }, []);

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
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-10 p-5 flex flex-col gap-5">
                            <h3 className="text-[19px] font-bold text-[#111827] leading-[1.35] max-w-[145px] m-0">
                                {title}
                            </h3>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="self-start bg-white text-[#111827] text-[13.5px] font-medium px-[18px] py-[9px] rounded-lg shadow-sm border-none cursor-pointer"
                            >
                                Source now
                            </motion.button>
                        </div>
                    </div>

                    {/* ── RIGHT BLOCK ── */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-gray-200">
                        {loading ? (
                            <div className="bg-white col-span-4 p-10 text-center text-gray-400">Loading items...</div>
                        ) : (
                            products.map((item, idx) => (
                                <Link
                                    to={`/product/${item._id}`} // MongoDB ki ID use karein
                                    state={{ product: item }}
                                    key={item._id || idx}
                                    className="bg-white no-underline"
                                >
                                    <motion.div
                                        whileHover={{ backgroundColor: "#f8f9fa", zIndex: 10 }}
                                        className="p-4 h-full flex flex-row items-center justify-between cursor-pointer"
                                    >
                                        <div className="flex flex-col justify-start">
                                            <h4 className="text-[15px] text-[#1c1c1c] mb-2 font-semibold leading-snug font-sans">
                                                {item.name}
                                            </h4>
                                            <p className="text-[13px] text-[#8b96a5] leading-[1.6] font-normal font-sans">
                                                {item.priceLabel}
                                                <br />
                                                {item.priceValue || `Rs. ${item.price}`}
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
                            ))
                        )}
                        {/* Agar database khali ho toh koi msg dikhane ke liye */}
                        {!loading && products.length === 0 && (
                            <div className="bg-white col-span-4 p-10 text-center text-gray-500">
                                No products found. Please add from Admin Panel.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CategoryCards;