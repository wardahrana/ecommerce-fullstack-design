// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // ← add this
import PageLayout from './components/shared/PageLayout';
import ProductListingPage from './pages/ProductListingPage';
import HomePage from './pages/Homepage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProfilePage from './pages/Profilepage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* ← CartProvider andar AuthProvider ke, bahar Routes ke */}
        <Routes>
          {/* Admin - no layout */}
          <Route path="/admin" element={<AdminPage />} />

          {/* All routes with PageLayout */}
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><ProfilePage /></PageLayout>} />
          <Route path="/cart" element={<PageLayout><CartPage /></PageLayout>} />
          <Route path="/product-listing" element={<PageLayout><ProductListingPage /></PageLayout>} />
          <Route path="/product/:id" element={<PageLayout><ProductDetailsPage /></PageLayout>} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;