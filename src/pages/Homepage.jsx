import CategoryCards from '../components/Home/CategoryCards';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import HeroSection from '../components/Home/HeroSection'
import RecommendedItems from '../components/Home/RecommendedItems';
import SupplierRequest from '../components/Home/SupplierRequest';
import ExtraServices from '../components/Home/ExtraServices';

function HomePage() {
    return (
        <div>

            <HeroSection />
            <FeaturedProducts />
            <CategoryCards />
            <SupplierRequest />
            <RecommendedItems />
            <ExtraServices />

        </div>
    )
}

export default HomePage