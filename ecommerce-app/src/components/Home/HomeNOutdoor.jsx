import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../pages/LoginModel";

export default function HomeAndOutdoor({ items }) { // Data ab props se aa raha hai
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
            // LocalStorage mein IDs 'id' hoti hain, '_id' nahi
            navigate(`/product/${product.id}`, { state: { product } });
        } else {
            navigate("/source");
        }
    };

    return (
        <>
            <section style={{ backgroundColor: "#f3f4f6", padding: "16px 0" }}>
                <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>
                    <div style={{ width: "100%", minHeight: "257px", display: "flex", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", backgroundColor: "#ffffff", position: "relative", fontFamily: "'Segoe UI', sans-serif" }}>

                        {/* LEFT SECTION */}
                        <div style={{ width: "240px", minWidth: "240px", background: "linear-gradient(135deg, #f0ede8 0%, #e8e0d5 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px 28px" }}>
                            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 12px 0", lineHeight: "1.25" }}>Home and<br />outdoor</h2>
                            <button
                                onClick={() => handleAction()}
                                style={{ display: "inline-block", padding: "7px 18px", backgroundColor: "#ffffff", color: "#1a1a2e", border: "1.5px solid #d0c8be", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "fit-content" }}
                            >
                                Source now
                            </button>
                        </div>

                        {/* RIGHT GRID */}
                        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 1fr)", overflow: "hidden" }}>
                            {items && items.length > 0 ? (
                                items.slice(0, 8).map((product, idx) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleAction(product)}
                                        onMouseEnter={() => setHoveredCard(product.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            width: "100%", height: "128.5px", display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", boxSizing: "border-box",
                                            borderBottom: idx < 4 ? "1px solid #f0f0f0" : "none",
                                            borderRight: (idx + 1) % 4 !== 0 ? "1px solid #f0f0f0" : "none",
                                            backgroundColor: hoveredCard === product.id ? "#fafafa" : "#ffffff",
                                            cursor: "pointer", transition: "background-color 0.15s ease"
                                        }}
                                    >
                                        <div style={{ width: "64px", minWidth: "64px", height: "64px", borderRadius: "6px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</span>
                                            <span style={{ fontSize: "12.5px", color: "#555", fontWeight: "500" }}>Rs. {product.price}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ gridColumn: "span 4", padding: "40px", textAlign: "center", color: "#888" }}>
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