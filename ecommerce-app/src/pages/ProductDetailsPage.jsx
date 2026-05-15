// src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Minus, Plus, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import LoginModal from './LoginModel'; // ← import

const ProductDetailsPage = () => {
    console.log("ProductDetailsPage rendering...");
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart, openCart } = useCart();
    const { user, login } = useAuth(); // ← user check

    const { getById } = useProducts();

    const [product, setProduct] = useState(location.state?.product || null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(!product);
    const [error, setError] = useState(null);

    // ── Login Modal state ──
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!product) {
            const foundProduct = getById(id);
            if (foundProduct) {
                setProduct(foundProduct);
                setLoading(false);
            } else {
                setError("Product not found");
                setLoading(false);
            }
        }
    }, [id, product, getById]);

    const handleAddToCart = () => {
        if (!product) return;

        // ── GUARD: logout hai toh modal kholo ──
        if (!user) {
            setLoginModalOpen(true);
            return;
        }

        // ── Logged in hai → cart mein add karo ──
        addToCart({
            productId: product.id || product._id || id,
            name: product.name || product.title,
            price: Number(product.price) || 0,
            image: product.image,
            quantity: quantity
        });

        openCart();
    };

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Product not found</h2>
                <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </div>
        );
    }

    const displayPrice = typeof product.price === 'number'
        ? `$${product.price.toFixed(2)}`
        : (product.price || product.priceValue || '$0.00');

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumbs & Back */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to products
                        </button>
                        <nav className="hidden sm:flex text-sm text-gray-500">
                            <Link to="/" className="hover:text-blue-600">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name || product.title}</span>
                        </nav>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex flex-col lg:flex-row">

                            {/* LEFT: Image */}
                            <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100 relative group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative w-full max-w-[400px] aspect-square flex items-center justify-center"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name || 'Product'}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105"
                                    />
                                </motion.div>
                                {product.discount && (
                                    <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                                        {product.discount}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: Details */}
                            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    {product.category && (
                                        <span className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2 block">
                                            {product.category}
                                        </span>
                                    )}
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        {product.name || product.title}
                                    </h1>
                                    <div className="text-3xl font-bold text-gray-900 mb-6">
                                        {displayPrice}
                                    </div>
                                    <p className="text-base text-gray-600 leading-relaxed mb-8">
                                        {product.description || "Premium quality product designed for durability and performance."}
                                    </p>
                                </motion.div>

                                <hr className="border-gray-100 mb-8" />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                    className="flex flex-col sm:flex-row gap-4 mb-8"
                                >
                                    {/* Quantity */}
                                    <div className="flex items-center border-2 border-gray-200 rounded-lg h-14 bg-white w-full sm:w-32 shrink-0">
                                        <button
                                            onClick={() => handleQuantityChange('dec')}
                                            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="flex-1 text-center font-semibold text-gray-900">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange('inc')}
                                            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    {/* Add to Cart — text bhi change hoga based on login state */}
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-3 font-semibold text-lg transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]"
                                    >
                                        <ShoppingCart size={20} />
                                        {user ? 'Add to cart' : 'Login to Add'}
                                    </button>

                                    {/* Wishlist */}
                                    <button className="h-14 w-14 flex items-center justify-center border-2 border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors shrink-0">
                                        <Heart size={20} />
                                    </button>
                                </motion.div>

                                {/* Trust Badges */}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-6"
                                >
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <Truck size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Free Delivery</p>
                                            <p className="text-xs">Orders over $50</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">1 Year Warranty</p>
                                            <p className="text-xs">100% Secure Checkout</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 sm:col-span-2">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                            <RotateCcw size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">30 Days Return</p>
                                            <p className="text-xs">Return it within 30 days for an exchange</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Login Modal ──
                Sirf tab mount hoga jab loginModalOpen = true
                from={location.pathname} → login ke baad wapas isi product pe ──  */}
            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSwitchToSignup={() => setLoginModalOpen(false)}
                loginFn={login}
                from={location.pathname}
            />
        </>
    );
};

export default ProductDetailsPage;