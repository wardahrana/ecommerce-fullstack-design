import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../pages/LoginModel";

import img1 from "../../assets/interior/1.jpg";
import img2 from "../../assets/interior/2.jpg";
import img3 from "../../assets/interior/3.jpg";
import img4 from "../../assets/interior/4.jpg";
import img5 from "../../assets/interior/5.jpg";
import img6 from "../../assets/interior/6.jpg";
import img7 from "../../assets/interior/7.jpg";
import img8 from "../../assets/interior/8.jpg";

const products = [
    { id: "ho-1", name: "Soft chairs", price: 19, description: "Comfortable soft chair for living room.", category: "Furniture", image: img1 },
    { id: "ho-2", name: "Sofa & chair", price: 199, description: "Premium sofa and chair set with modern design.", category: "Furniture", image: img2 },
    { id: "ho-3", name: "Kitchen dishes", price: 39, description: "Elegant ceramic kitchen dishes set.", category: "Kitchen", image: img3 },
    { id: "ho-4", name: "Smart watches", price: 129, description: "Waterproof smart watch with heart rate monitor.", category: "Electronics", image: img4 },
    { id: "ho-5", name: "Kitchen mixer", price: 100, description: "High-power kitchen mixer for baking and cooking.", category: "Appliances", image: img5 },
    { id: "ho-6", name: "Blenders", price: 39, description: "Multi-speed blender for smoothies and shakes.", category: "Appliances", image: img6 },
    { id: "ho-7", name: "Home appliance", price: 149, description: "Essential home appliance for everyday convenience.", category: "Appliances", image: img7 },
    { id: "ho-8", name: "Coffee maker", price: 89, description: "Automatic drip coffee maker with timer.", category: "Kitchen", image: img8 },
];

export default function HomeAndOutdoor() {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState(null);

    const handleAction = (product = null) => {
        if (product) {
            if (!user) {
                setPendingProduct(product);
                setLoginModalOpen(true);
                return;
            }
            navigate(`/product/${product.id}`, { state: { product } });
        } else {
            navigate("/source");
        }
    };

    return (
        <>
            <section style={{ backgroundColor: "#f3f4f6", padding: "16px 0" }}>
                <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>
                    <div style={{ width: "100%", height: "257px", display: "flex", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", backgroundColor: "#ffffff", position: "relative", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>

                        {/* LEFT SECTION */}
                        <div style={{ width: "240px", minWidth: "240px", height: "257px", background: "linear-gradient(135deg, #f0ede8 0%, #e8e0d5 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px 28px", position: "relative", overflow: "hidden" }}>
                            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 12px 0", lineHeight: "1.25" }}>Home and<br />outdoor</h2>
                            <button
                                onClick={() => handleAction()}
                                style={{ display: "inline-block", padding: "7px 18px", backgroundColor: "#ffffff", color: "#1a1a2e", border: "1.5px solid #d0c8be", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "fit-content", transition: "all 0.18s ease" }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a2e"; e.currentTarget.style.color = "#ffffff"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#1a1a2e"; }}
                            >
                                Source now
                            </button>
                        </div>

                        {/* RIGHT GRID */}
                        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 1fr)", height: "257px", overflow: "hidden" }}>
                            {products.map((product, idx) => {
                                const isTopRow = idx < 4;
                                const isLastCol = (idx + 1) % 4 === 0;

                                return (
                                    <div
                                        key={product.id}
                                        onClick={() => handleAction(product)}
                                        onMouseEnter={() => setHoveredCard(product.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            width: "100%", height: "128.5px", display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", boxSizing: "border-box",
                                            borderBottom: isTopRow ? "1px solid #f0f0f0" : "none",
                                            borderRight: !isLastCol ? "1px solid #f0f0f0" : "none",
                                            backgroundColor: hoveredCard === product.id ? "#fafafa" : "#ffffff",
                                            cursor: user ? "pointer" : "not-allowed",
                                            transition: "background-color 0.15s ease", position: "relative"
                                        }}
                                    >
                                        <div style={{ width: "64px", minWidth: "64px", height: "64px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</span>
                                            <span style={{ fontSize: "12.5px", color: "#555", fontWeight: "500" }}>USD {product.price}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSwitchToSignup={() => setLoginModalOpen(false)}
                loginFn={login}
                from={pendingProduct ? `/product/${pendingProduct.id}` : '/'}
            />
        </>
    );
}