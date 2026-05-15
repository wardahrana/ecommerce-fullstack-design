// src/pages/HomePage.jsx
import React from 'react';
import CategoryCards from '../components/Home/CategoryCards';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import HeroSection from '../components/Home/HeroSection'
import RecommendedItems from '../components/Home/RecommendedItems';
import SupplierRequest from '../components/Home/SupplierRequests';
import ExtraServices from '../components/Home/ExtraServices';
import HomeAndOutdoor from '../components/Home/HomeNOutdoor';

function HomePage() {
    return (
        <div>
            <HeroSection />
            <FeaturedProducts />
            <HomeAndOutdoor />
            <CategoryCards />
            <RecommendedItems />
            <ExtraServices />
            <SupplierRequest />
        </div>
    )
}

export default HomePage;