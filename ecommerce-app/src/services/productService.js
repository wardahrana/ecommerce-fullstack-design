import watch from '../assets/tech/8.jpg';
import Laptop from '../assets/tech/7.jpg';
import camera from '../assets/tech/6.jpg';
import Headphone from '../assets/tech/5.jpg';
import Phone from '../assets/tech/4.jpg';

const initialProducts = [
  // 1. DEALS AND OFFERS
  { id: "feat-1", name: "Smart watches", price: 199, category: "Wearables", image: watch, componentType: "featured", discount: "-25%" },
  { id: "feat-2", name: "Laptops", price: 899, category: "Computers", image: Laptop, componentType: "featured", discount: "-15%" },
  { id: "feat-3", name: "GoPro cameras", price: 299, category: "Cameras", image: camera, componentType: "featured", discount: "-40%" },
  { id: "feat-4", name: "Headphones", price: 149, category: "Audio", image: Headphone, componentType: "featured", discount: "-25%" },
  { id: "feat-5", name: "Canon cameras", price: 499, category: "Cameras", image: Phone, componentType: "featured", discount: "-25%" },

  // 2. HOME AND OUTDOOR
  { id: "ho-1", name: "Soft chairs", price: 19, category: "Furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267", componentType: "homeAndOutdoor" },
  { id: "ho-2", name: "Sofa & chair", price: 19, category: "Furniture", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5", componentType: "homeAndOutdoor" },
  { id: "ho-3", name: "Kitchen dishes", price: 19, category: "Appliances", image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c", componentType: "homeAndOutdoor" },
  { id: "ho-4", name: "Smart watches", price: 19, category: "Wearables", image: watch, componentType: "homeAndOutdoor" },
  { id: "ho-5", name: "Kitchen mixer", price: 100, category: "Appliances", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587", componentType: "homeAndOutdoor" },
  { id: "ho-6", name: "Blenders", price: 39, category: "Appliances", image: "https://images.unsplash.com/photo-1570222020579-34835601e4c0", componentType: "homeAndOutdoor" },
  { id: "ho-7", name: "Home appliance", price: 19, category: "Appliances", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da", componentType: "homeAndOutdoor" },
  { id: "ho-8", name: "Coffee maker", price: 10, category: "Appliances", image: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2", componentType: "homeAndOutdoor" },

  // 3. CONSUMER ELECTRONICS
  { id: "ce-1", name: "Smart watches", price: 19, category: "Tech", image: watch, componentType: "electronics" },
  { id: "ce-2", name: "Cameras", price: 89, category: "Tech", image: camera, componentType: "electronics" },
  { id: "ce-3", name: "Headphones", price: 10, category: "Tech", image: Headphone, componentType: "electronics" },
  { id: "ce-4", name: "Smart watches", price: 90, category: "Tech", image: watch, componentType: "electronics" },
  { id: "ce-5", name: "Gaming set", price: 35, category: "Tech", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e", componentType: "electronics" },
  { id: "ce-6", name: "Laptops & PC", price: 340, category: "Tech", image: Laptop, componentType: "electronics" },
  { id: "ce-7", name: "Smartphones", price: 19, category: "Tech", image: Phone, componentType: "electronics" },
  { id: "ce-8", name: "Electric kettle", price: 240, category: "Tech", image: "https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f6", componentType: "electronics" },

  // 4. RECOMMENDED ITEMS
  { id: "rec-1", name: "T-shirts", price: 10.30, category: "Clothing", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518", componentType: "recommended" },
  { id: "rec-2", name: "Jeans shorts", price: 10.30, category: "Clothing", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b", componentType: "recommended" },
  { id: "rec-3", name: "Winter coat", price: 12.50, category: "Clothing", image: "https://images.unsplash.com/photo-1539533377285-a27041443493", componentType: "recommended" },
  { id: "rec-4", name: "Jeans bag", price: 34.00, category: "Accessories", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601", componentType: "recommended" },
  { id: "rec-5", name: "Leather wallet", price: 99.00, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93", componentType: "recommended" }
];

const getProducts = () => {
  const products = localStorage.getItem('app_products');
  // FORCE SEEDING: Agar data '[]' hai toh foran reset karo
  if (!products || JSON.parse(products).length === 0) {
    localStorage.setItem('app_products', JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(products);
};

export const productService = {
  getAll: () => Promise.resolve(getProducts()),

  // Isay Promise.resolve mein wrap kiya taake HomePage ka 'await' kaam kare
  getByComponent: (type) => {
    const filtered = getProducts().filter(p => p.componentType === type);
    return Promise.resolve(filtered);
  },

  create: (data) => {
    const products = getProducts();
    const newProd = { ...data, id: Date.now().toString() };
    products.push(newProd);
    localStorage.setItem('app_products', JSON.stringify(products));
    window.dispatchEvent(new Event('productsUpdated'));
    return Promise.resolve(newProd);
  },

  delete: (id) => {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('app_products', JSON.stringify(products));
    window.dispatchEvent(new Event('productsUpdated'));
    return Promise.resolve(true);
  }
};