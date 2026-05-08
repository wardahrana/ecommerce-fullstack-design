import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductTopSection from '../components/ProductDetails/ProductTopSection';
import ProductMiddleSection from '../components/ProductDetails/ProductMiddleSection';
import ProductBottomSection from '../components/ProductDetails/ProductBottomSection';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById } = useProducts();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const found = getById(id);
        if (found) {
            setProduct(found);
        } else {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [id, navigate]);

    if (!product) {
        return (
            <div className="min-h-screen pt-20 text-center">
                <div className="text-xl text-gray-600">Product not found...</div>
                <div className="text-sm text-gray-400 mt-2">Redirecting to home page</div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen py-4">
            <div className="max-w-screen-xl mx-auto px-4">
                <nav className="flex items-center text-sm text-gray-500 py-2 mb-4">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to={`/category/${product.category}`} className="hover:text-blue-600 transition-colors">
                        {product.category || 'Products'}
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-600 line-clamp-1">{product.title}</span>
                </nav>

                <div className="flex flex-col gap-6">
                    <ProductTopSection product={product} />
                    <ProductMiddleSection product={product} />
                    <ProductBottomSection />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;