import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

// Path ab theek hai kyunke ye Home folder ke andar hain
import FeaturedProducts from "../components/Home/FeaturedProducts";
import HomeAndOutdoor from "../components/Home/HomeNOutdoor";
import RecommendedItems from "../components/Home/RecommendedItems";

const HomePage = () => {
    const [featured, setFeatured] = useState([]);
    const [homeItems, setHomeItems] = useState([]);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            // Data fetch karte waqt ensure karein ke types match kar rahi hain
            const allFeatured = await productService.getByComponent('featured');
            const allHome = await productService.getByComponent('homeAndOutdoor');
            const allRecommended = await productService.getByComponent('recommended');

            setFeatured(allFeatured);
            setHomeItems(allHome);
            setRecommended(allRecommended);
        };

        loadData();

        window.addEventListener('productsUpdated', loadData);
        return () => window.removeEventListener('productsUpdated', loadData);
    }, []);

    return (
        <div className="space-y-8">
            {/* IMPORTANT: Yahan wahi naam use karein jo upar IMPORT kiye hain.
               Pehle aap FeaturedDeals likh rahe thay jo define nahi tha.
            */}
            <FeaturedProducts items={featured} />
            <HomeAndOutdoor items={homeItems} />
            {/* Agar aapne electronics ka alag banaya hai toh wahan data pass karein */}
            <RecommendedItems items={recommended} />
        </div>
    );
};

export default HomePage;