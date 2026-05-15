import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../pages/LoginModel";

// 1. Assets Import karein (Paths apne folder structure ke mutabiq check kar lein)
import chairImg from "../../assets/interior/1.jpg";
import sofaImg from "../../assets/interior/2.jpg";
import dishImg from "../../assets/interior/3.jpg";
import watchImg from "../../assets/interior/4.jpg";
import mixerImg from "../../assets/interior/5.jpg";
import blenderImg from "../../assets/interior/6.jpg";
import applianceImg from "../../assets/interior/7.jpg";
import coffeeImg from "../../assets/interior/8.jpg";

export default function HomeAndOutdoor({ items }) {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState(null);

    // 2. Images Mapping Array
    const localImages = [chairImg, sofaImg, dishImg, watchImg, mixerImg, blenderImg, applianceImg, coffeeImg];

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
                    <div style={{ width: "100%", minHeight: "257px", display: "flex", borderRadius: "8px", overflow: "hidden", border: "1px solid #e0e0e0", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', sans-serif" }}>

                        {/* LEFT SECTION */}
                        <div style={{ width: "240px", minWidth: "240px", background: "#f5f5f5", display: "flex", flexDirection: "column", padding: "24px" }}>
                            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1c1c1c", margin: "0 0 15px 0", lineHeight: "1.2" }}>Home and<br />outdoor</h2>
                            <button
                                onClick={() => handleAction()}
                                style={{ padding: "8px 16px", backgroundColor: "#ffffff", color: "#1c1c1c", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer", width: "fit-content", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
                            >
                                Source now
                            </button>
                        </div>

                        {/* RIGHT GRID */}
                        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 1fr)", backgroundColor: "#e0e0e0", gap: "1px" }}>
                            {items && items.length > 0 ? (
                                items.slice(0, 8).map((product, idx) => (
                                    <div
                                        key={product.id || idx}
                                        onClick={() => handleAction(product)}
                                        onMouseEnter={() => setHoveredCard(idx)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            display: "flex", justifyContent: "space-between", padding: "15px", boxSizing: "border-box",
                                            backgroundColor: hoveredCard === idx ? "#f9f9f9" : "#ffffff",
                                            cursor: "pointer", height: "128px"
                                        }}
                                    >
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ fontSize: "14px", fontWeight: "500", color: "#1c1c1c" }}>{product.name}</span>
                                            <span style={{ fontSize: "13px", color: "#8b96a5", marginTop: "8px" }}>From<br />Rs. {product.price}</span>
                                        </div>

                                        {/* Image using local fallback */}
                                        <div style={{ width: "65px", height: "65px", alignSelf: "flex-end" }}>
                                            <img
                                                src={localImages[idx] || product.image}
                                                alt={product.name}
                                                style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ gridColumn: "span 4", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
                                    No products available.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                loginFn={login}
                from={pendingProduct ? `/product/${pendingProduct.id}` : '/'}
            />
        </>
    );
}