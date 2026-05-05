import { motion } from "framer-motion";

const ExtraServices = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const supplierVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    const services = [
        {
            title: "Source from\nIndustry Hubs",
            icon: "📦",
            bgGradient: "from-amber-700/90 to-amber-900/70",
            badgeIcon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" fill="none" strokeWidth="2" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
        },
        {
            title: "Customize Your\nProducts",
            icon: "🎨",
            bgGradient: "from-pink-500 via-yellow-400 to-blue-400",
            badgeIcon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" fill="none" strokeWidth="2" />
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
        },
        {
            title: "Fast, reliable shipping\nby ocean or air",
            icon: "✈️",
            bgGradient: "from-blue-400 via-purple-400 to-pink-400",
            badgeIcon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
            ),
        },
        {
            title: "Product monitoring\nand inspection",
            icon: "🏭",
            bgGradient: "from-gray-700 via-gray-600 to-gray-500",
            badgeIcon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
            ),
        },
    ];

    const suppliers = [
        { flag: "🇦🇪", country: "Arabic Emirates", domain: "shopname.ae" },
        { flag: "🇦🇺", country: "Australia", domain: "shopname.ae" },
        { flag: "🇺🇸", country: "United States", domain: "shopname.ae" },
        { flag: "🇷🇺", country: "Russia", domain: "shopname.ru" },
        { flag: "🇮🇹", country: "Italy", domain: "shopname.it" },
        { flag: "🇩🇰", country: "Denmark", domain: "denmark.com.dk" },
        { flag: "🇫🇷", country: "France", domain: "shopname.com.fr" },
        { flag: "🇦🇪", country: "Arabic Emirates", domain: "shopname.ae" },
        { flag: "🇨🇳", country: "China", domain: "shopname.ae" },
        { flag: "🇬🇧", country: "Great Britain", domain: "shopname.co.uk" },
    ];

    return (
        <section className="bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-screen-xl mx-auto">

                {/* Our extra services heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-5"
                >
                    Our extra services
                </motion.h2>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-9"
                >
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            {/* Image Placeholder with Icon */}
                            <div className={`relative h-32 bg-gradient-to-r ${service.bgGradient} flex items-center justify-center`}>
                                <span className="text-5xl">{service.icon}</span>

                                {/* Icon Badge */}
                                <div className="absolute -bottom-5 right-3 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                                    <div className="text-gray-700 w-5 h-5">
                                        {service.badgeIcon}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-3 pt-6">
                                <h3 className="text-sm font-semibold text-gray-900 leading-tight whitespace-pre-line">
                                    {service.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Suppliers by region heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-5 mt-8"
                >
                    Suppliers by region
                </motion.h2>

                {/* Suppliers Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                >
                    {suppliers.map((supplier, idx) => (
                        <motion.div
                            key={idx}
                            variants={supplierVariants}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <span className="text-2xl">{supplier.flag}</span>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {supplier.country}
                                </p>
                                <p className="text-xs text-gray-400">{supplier.domain}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default ExtraServices;