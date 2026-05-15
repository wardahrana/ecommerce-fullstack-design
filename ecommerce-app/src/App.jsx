// src/App.jsx
import React, { useEffect } from 'react'; // Added useEffect
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { productService } from './services/productService'; // Added productService import

// Layout & Pages
import PageLayout from './components/shared/PageLayout';
import ProductListingPage from './pages/ProductListingPage';
import HomePage from './pages/Homepage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProfilePage from './pages/Profilepage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminPage';
import LoginModal from './pages/LoginModel';

function App() {



  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Admin - no layout */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* All routes wrapped with PageLayout */}
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><ProfilePage /></PageLayout>} />
          <Route path="/cart" element={<PageLayout><CartPage /></PageLayout>} />
          <Route path="/product-listing" element={<PageLayout><ProductListingPage /></PageLayout>} />
          <Route path="/product/:id" element={<PageLayout><ProductDetailsPage /></PageLayout>} />

          <Route
            path="/login"
            element={
              <PageLayout>
                <div className="flex justify-center py-20">
                  <LoginModal isOpen={true} onClose={() => window.location.href = '/'} />
                </div>
              </PageLayout>
            }
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;