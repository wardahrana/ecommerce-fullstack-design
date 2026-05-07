import { Routes, Route } from 'react-router-dom'
import Layout from './components/shared/PageLayout'
import ProductListingPage from './pages/ProductListingPage'
import HomePage from './pages/Homepage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/Profilepage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Routes>
      {/* ✅ Admin — Layout ke bahar, apna Header/Footer nahi chahiye */}
      <Route path="/admin" element={<AdminPage />} />

      {/* ✅ Baaki sab — Layout ke andar */}
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product-listing" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  )
}

export default App