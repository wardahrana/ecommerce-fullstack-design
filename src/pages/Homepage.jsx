import CategoryCards from '../components/Home/CategoryCards';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import HeroSection from '../components/Home/HeroSection'
import RecommendedItems from '../components/Home/RecommendedItems';
import SupplierRequest from '../components/Home/SupplierRequest';

function HomePage() {
    console.log("HomePage is rendering");
    return (
        <div>

            <HeroSection />
            <FeaturedProducts />
            <CategoryCards />
            <SupplierRequest />
            <RecommendedItems />

        </div>
    )
}

export default HomePage