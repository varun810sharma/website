"use client";

import { motion } from "framer-motion";

const landmarks = [
    { src: "/taj-mahal.png", alt: "Taj Mahal", offset: -220, scale: 0.9 },
    { src: "/india-gate.png", alt: "India Gate", offset: 0, scale: 1.1 },
    { src: "/charminar.png", alt: "Charminar", offset: 220, scale: 0.9 },
];

export default function BasedInIndia() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4rem",
                marginBottom: "2rem",
                textAlign: "center",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                }}
            >
                {/* High-quality Composite (Visible when combined) */}
                <motion.div
                    initial={{ opacity: 1, scale: 1.1 }}
                    animate={{
                        opacity: [1, 1, 0, 0, 1],
                        scale: [1.1, 1.1, 1, 1, 1.1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        times: [0, 0.2, 0.25, 0.95, 1],
                    }}
                    style={{
                        position: "absolute",
                        width: "200px",
                        height: "200px",
                        zIndex: 20,
                    }}
                >
                    <img
                        src="/india-heritage.png"
                        alt="Based in India"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            filter: "contrast(1.1) brightness(1.05)",
                        }}
                    />
                </motion.div>

                {/* Individual Landmarks (Visible during explosion) */}
                {landmarks.map((landmark, index) => (
                    <motion.div
                        key={landmark.alt}
                        initial={{ x: 0, opacity: 0, scale: 0.8 }}
                        animate={{
                            x: [0, 0, landmark.offset, landmark.offset, 0],
                            opacity: [0, 0, 1, 1, 0],
                            scale: [landmark.scale, landmark.scale, 1, 1, landmark.scale],
                            zIndex: 10,
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            times: [0, 0.2, 0.45, 0.75, 1],
                        }}
                        style={{
                            position: "absolute",
                            width: "180px",
                            height: "180px",
                        }}
                    >
                        <img
                            src={landmark.src}
                            alt={landmark.alt}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                                filter: "contrast(1.1) brightness(1.05)",
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h3
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        margin: "0 0 0.25rem 0",
                        color: "var(--foreground)",
                    }}
                >
                    Based in
                </h3>
                <p
                    style={{
                        fontSize: "0.95rem",
                        margin: 0,
                        color: "var(--muted)",
                        fontWeight: 500,
                    }}
                >
                    India
                </p>
            </motion.div>
        </div>
    );
}
