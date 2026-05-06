import { Routes, Route } from 'react-router-dom'  // ✅ Sirf Routes, Route import karo
import Layout from './components/shared/PageLayout'
import ProductListingPage from './pages/ProductListingPage'
import HomePage from './pages/Homepage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/Profilepage';
import CartPage from './pages/CartPage'


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/product-listing' element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* More routes will be added here */}
      </Routes>
    </Layout>
  )
}

export default App