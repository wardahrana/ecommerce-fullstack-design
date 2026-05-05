import React from 'react';
import Breadcrumb from '../components/ProductListing/Breadcrumb';
import Sidebar from '../components/ProductListing/Sidebar';
import ProductList from '../components/ProductListing/ProductList';

const ProductListingPage = () => {
    return (
        <div className="bg-[#f8fafc] min-h-screen py-4">
            <div className="max-w-screen-xl mx-auto px-4">
                <Breadcrumb />
                <div className="flex flex-col lg:flex-row gap-6 mt-4">
                    <Sidebar />
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
