// src/components/shared/AppFooter.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  const footerLinks = {
    About: ["About Us", "Find store", "Categories", "Blogs"],
    Partnership: ["About Us", "Find store", "Categories", "Blogs"],
    Information: ["Help Center", "Money Refund", "Shipping", "Contact us"],
    "For users": ["Login", "Register", "Settings", "My Orders"],
  };

  const socialIcons = [
    {
      label: "Facebook",
      path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    },
    {
      label: "Twitter",
      path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    },
    {
      label: "LinkedIn",
      path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
    },
    {
      label: "Instagram",
      path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 20.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    },
    {
      label: "YouTube",
      path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
    },
  ];

  return (
    <footer>
      {/* ── Newsletter Section ── */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Subscribe on our newsletter
          </h3>
          <p className="text-sm text-gray-500">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex items-center gap-0 mt-1"
          >
            <div className="flex items-center border border-gray-300 bg-white rounded-l-md px-3 py-2.5 gap-2">
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                className="text-gray-400 shrink-0"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none text-sm text-gray-600 bg-transparent w-56"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-r-md hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="bg-white py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-8">

            {/* Brand + Social */}
            <div className="flex-1 min-w-[200px] max-w-xs">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" />
                    <path
                      d="M16 10a4 4 0 01-8 0"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-blue-500">Brand</span>
              </Link>

              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Best information about the company gies here but now lorem ipsum is
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {socialIcons.map(({ label, path }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-100 hover:text-blue-500 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d={path}
                        stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="min-w-[120px]">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        to="#"
                        className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Get App */}
            <div className="min-w-[160px]">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Get app</h4>
              <div className="flex flex-col gap-3">
                {/* App Store */}
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-300 leading-none">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">App Store</div>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M3.18 23.76c.3.17.64.24.99.2L14.24 12 10.56 8.32 3.18 23.76zM20.9 10.98l-2.87-1.63-3.79 3.79 3.79 3.79 2.89-1.64c.82-.46.82-1.84-.02-2.31zM2.23 1.48C2.09 1.67 2 1.91 2 2.21v19.58c0 .3.09.55.23.74l.08.07 10.97-10.97v-.26L2.31 1.41l-.08.07zM14.24 12l3.69 3.69-10.48 5.95L14.24 12z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-300 leading-none">GET IT ON</div>
                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-gray-50 border-t border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">© 2023 Ecommerce.</p>

          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-500 transition-colors">
            <span className="text-base">🇺🇸</span>
            English
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;