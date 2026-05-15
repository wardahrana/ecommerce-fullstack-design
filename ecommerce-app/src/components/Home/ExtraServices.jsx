import React from "react";

// ── Image imports ── adjust filenames to match your actual assets
import sourceImg from "../../assets/Extra Services/Cargo.png";
import customizeImg from "../../assets/Extra Services/Aeroplane.png";
import shippingImg from "../../assets/Extra Services/Colours.png";
import monitoringImg from "../../assets/Extra Services/Expension.png";


// ── Icons (inline SVG so no extra deps needed) ──
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const BoxIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
);

const PlaneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22 11 13 2 9l20-7z" />
    </svg>
);

const ShieldIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const services = [
    {
        img: sourceImg,
        icon: <SearchIcon />,
        label: "Source from Industry Hubs",
    },
    {
        img: customizeImg,
        icon: <BoxIcon />,
        label: "Customize Your Products",
    },
    {
        img: shippingImg,
        icon: <PlaneIcon />,
        label: "Fast, reliable shipping by ocean or air",
    },
    {
        img: monitoringImg,
        icon: <ShieldIcon />,
        label: "Product monitoring and inspection",
    },
];

export default function ExtraServices() {
    return (
        <section style={styles.section}>
            <h2 style={styles.heading}>Our extra services</h2>

            <div style={styles.grid}>
                {services.map((svc, i) => (
                    <div key={i} style={styles.card}>
                        {/* Photo area */}
                        <div style={styles.imgWrapper}>
                            <img src={svc.img} alt={svc.label} style={styles.img} />
                            {/* Icon badge — bottom-right of the image */}
                            <div style={styles.iconBadge}>{svc.icon}</div>
                        </div>

                        {/* Label */}
                        <p style={styles.label}>{svc.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─────────────── Styles ─────────────── */
const styles = {
    section: {
        padding: "20px 16px",
        fontFamily: "'Segoe UI', sans-serif",
        maxWidth: "960px",
        margin: "0 auto",
    },

    heading: {
        fontSize: "16px",
        fontWeight: "700",
        color: "#1a1a2e",
        margin: "0 0 14px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
        border: "2px solid #a8d8f0",
        borderRadius: "6px",
        padding: "14px",
        backgroundColor: "#ffffff",
    },

    card: {
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
    },

    imgWrapper: {
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
    },

    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },

    /* Circular icon badge sits at bottom-right of the photo */
    iconBadge: {
        position: "absolute",
        bottom: "8px",
        right: "8px",
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#444",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
    },

    label: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#1a1a2e",
        margin: "8px 0 0",
        lineHeight: "1.35",
    },
};