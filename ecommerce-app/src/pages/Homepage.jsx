import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

// Components
import FeaturedProducts from "../components/Home/FeaturedProducts";
import HomeAndOutdoor from "../components/Home/HomeNOutdoor";
import RecommendedItems from "../components/Home/RecommendedItems";
import HeroSection from '../components/Home/HeroSection';
import SupplierRequests from '../components/Home/SupplierRequests';
import CategoryCards from '../components/Home/CategoryCards';
import ExtraServices from '../components/Home/ExtraServices';

// 1. Image 2 wale Assets yahan import karein
import itBanner from '../assets/banner/it.png';
import watchImg from '../assets/tech/8.jpg';
import cameraImg from '../assets/tech/6.jpg';
import Img3 from '../assets/tech/4.jpg'
import Img4 from '../assets/tech/7.jpg';
import Img5 from '../assets/tech/8.jpg';
import Img6 from '../assets/tech/9.jpg';
import Img7 from '../assets/tech/5.jpg';
import Img8 from '../assets/tech/3.jpg';
import Img9 from '../assets/interior/9.jpg';


const HomePage = () => {
    const [featured, setFeatured] = useState([]);
    const [homeItems, setHomeItems] = useState([]);
    const [recommended, setRecommended] = useState([]);
    // 2. Electronics products ke liye state
    const [electronics, setElectronics] = useState([]);

    const loadData = async () => {
        try {
            const allFeatured = await productService.getByComponent('featured');
            const allHome = await productService.getByComponent('homeAndOutdoor');
            const allRecommended = await productService.getByComponent('recommended');

            // Backend se electronics ka data mangwayein
            const allElectronics = await productService.getByComponent('electronics');

            setFeatured(allFeatured);
            setHomeItems(allHome);
            setRecommended(allRecommended);

            // 3. Agar backend se images nahi aa rahi, toh local assets map karein
            // Yeh step zaroori hai "Image 2" jaisa look lane ke liye
            const mappedElectronics = allElectronics.map((prod, index) => ({
                ...prod,
                image: [watchImg, cameraImg, Img3, Img4, Img5, Img6, Img7, Img8, Img9][index] || prod.image
            }));

            setElectronics(mappedElectronics);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    useEffect(() => {
        loadData();
        window.addEventListener('productsUpdated', loadData);
        return () => window.removeEventListener('productsUpdated', loadData);
    }, []);

    return (
        <div className="space-y-8">
            <HeroSection />
            <FeaturedProducts items={featured} />

            {/* 4. CategoryCards ko props pass karein */}
            <CategoryCards
                title="Consumer electronics and gadgets"
                bannerImage={itBanner}
                products={electronics}
            />

            <HomeAndOutdoor items={homeItems} />
            <RecommendedItems items={recommended} />
            <SupplierRequests />
            <ExtraServices />
        </div>
    );
};

export default HomePage;