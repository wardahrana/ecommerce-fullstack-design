export const PRODUCTS = [
    {
        id: 1,
        title: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format",
        rating: 4.7,
        reviewCount: 32,
        soldCount: 154,
        stockStatus: "In stock",
        type: "Classic shoes",
        material: "Plastic material",
        design: "Modern nice",
        customization: "Customized logo and design custom packages",
        protection: "Refund Policy",
        warranty: "2 years full warranty",
        pricingTiers: [
            { minQty: 50, maxQty: 100, price: 98.00 },
            { minQty: 100, maxQty: 700, price: 90.00 },
            { minQty: 700, maxQty: null, price: 78.00 }
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        specifications: {
            model: "#8786867",
            style: "Classic style",
            certificate: "ISO-898921212",
            size: "34mm x 450mm x 19mm",
            memory: "36GB RAM"
        },
        features: [
            "Some great feature name here",
            "Lorem ipsum dolor sit amet, consectetur",
            "Duis aute irure dolor in reprehenderit",
            "Some great feature name here"
        ],
        supplier: {
            name: "Guanoji Trading LLC",
            location: "Germany, Berlin",
            verified: true,
            worldwideShipping: true
        },
        category: "clothings",
        price: 98.00,
        oldPrice: 149.99
    },
    {
        id: 2,
        title: "Premium Wireless Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format",
        rating: 4.9,
        reviewCount: 128,
        soldCount: 342,
        stockStatus: "In stock",
        type: "Electronics",
        material: "Aluminum alloy",
        design: "Ergonomic",
        customization: "Custom engraving available",
        protection: "30-day return",
        warranty: "1 year warranty",
        pricingTiers: [
            { minQty: 10, maxQty: 50, price: 99.99 },
            { minQty: 50, maxQty: 200, price: 89.99 },
            { minQty: 200, maxQty: null, price: 79.99 }
        ],
        description: "Experience crystal clear sound with our premium wireless headphones. Features include 30-hour battery life, noise cancellation, and comfortable over-ear design.",
        specifications: {
            model: "#HP-2024",
            style: "Over-ear",
            certificate: "CE/FCC/RoHS",
            size: "180mm x 80mm x 200mm",
            memory: "N/A"
        },
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Bluetooth 5.3",
            "Foldable design"
        ],
        supplier: {
            name: "AudioTech GmbH",
            location: "Berlin, Germany",
            verified: true,
            worldwideShipping: true
        },
        category: "electronics",
        price: 99.99,
        oldPrice: 149.99
    }
    // Add more products as needed
];