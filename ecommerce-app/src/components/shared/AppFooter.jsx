import React from 'react';
import { Link } from 'react-router-dom';
import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';

const Footer = () => {
  return (
    <>
      {/* Newsletter Banner - Top Section */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-1">Subscribe on our newsletter</h3>
          <p className="text-gray-500 text-sm mb-5">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <div className="flex items-center justify-center gap-0 max-w-md mx-auto">
            <div className="flex items-center bg-white border border-gray-300 border-r-0 rounded-l-md px-3 py-2 flex-1">
              <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="Email"
                className="flex-1 text-sm focus:outline-none bg-transparent text-gray-700 placeholder-gray-400 border-none outline-none"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-r-md text-sm font-medium transition-colors border-none outline-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer - White */}
      <footer className="bg-white pt-10 pb-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-10">

            {/* Brand Info */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-500 rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-blue-500">Brand</span>
              </div>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                Best information about the company goes here but now lorem ipsum is
              </p>
              <div className="flex space-x-3">
                {[SiFacebook, SiX, SiInstagram, SiYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">About</h4>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                {['About Us', 'Find store', 'Categories', 'Blogs'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Partnership */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Partnership</h4>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                {['About Us', 'Find store', 'Categories', 'Blogs'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Information</h4>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                {['Help Center', 'Money Refund', 'Shipping', 'Contact us'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* For Users */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">For users</h4>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                {['Login', 'Register', 'Settings', 'My Orders'].map((item) => (
                  <li key={item}><Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Get App */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Get app</h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="bg-black text-white rounded-md px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-36">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <p className="text-gray-400 text-[9px] leading-none">Download on the</p>
                    <p className="text-white text-xs font-semibold">App Store</p>
                  </div>
                </a>
                <a href="#" className="bg-black text-white rounded-md px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-36">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                    <path d="M3.18 23.76c.3.17.64.22.99.15l12.5-7.18-2.61-2.61-10.88 9.64zM.35 1.31C.13 1.6 0 2.02 0 2.56v18.89c0 .54.13.96.36 1.24l.07.06 10.58-10.58v-.24L.42 1.25l-.07.06zM20.69 10.2l-2.83-1.63-2.93 2.93 2.93 2.93 2.84-1.63c.81-.46.81-1.22-.01-1.6zM3.18.24L15.68 7.4l-2.61 2.61L.35.37C.65.2.99.15 1.34.22l1.84 1.02z" />
                  </svg>
                  <div>
                    <p className="text-gray-400 text-[9px] leading-none">GET IT ON</p>
                    <p className="text-white text-xs font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 py-4 flex flex-col md:flex-row items-center justify-between bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <p className="text-gray-500 text-sm mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} Ecommerce.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>🇺🇸</span>
              <span>English</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;