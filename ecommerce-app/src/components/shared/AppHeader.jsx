// src/components/shared/AppHeader.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const AppHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All category");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const { totalItems } = useCart();
  const { user } = useAuth();

  const categories = [
    "All category",
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Beauty",
    "Automotive",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-listing?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* ── Top Bar ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" />
                <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-500">Brand</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 border-r-0 rounded-l-md text-sm outline-none focus:border-blue-400 transition-colors"
            />

            {/* Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="h-full px-3 border border-gray-200 border-r-0 bg-white text-sm text-gray-600 flex items-center gap-1 whitespace-nowrap hover:bg-gray-50 transition-colors"
              >
                {selectedCategory}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
              {categoryOpen && (
                <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded-r-md hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-5 ml-auto shrink-0">
            {/* Profile */}
            <Link to="/profile" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs">Profile</span>
            </Link>

            {/* Message */}
            <Link to="#" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs">Message</span>
            </Link>

            {/* Orders */}
            <Link to="/profile" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs">Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-blue-500 transition-colors relative">
              <div className="relative">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs">My cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Nav Bar ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">

          {/* Left Nav */}
          <nav className="flex items-center gap-6">
            {/* All category hamburger */}
            <button className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-blue-500 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              All category
            </button>

            {["Hot offers", "Gift boxes", "Projects", "Menu item"].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                {item}
              </Link>
            ))}

            {/* Help with dropdown arrow */}
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
              Help
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </button>
          </nav>

          {/* Right — Language & Ship to */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
              English, USD
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
              Ship to
              <span className="text-base">🇩🇪</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;