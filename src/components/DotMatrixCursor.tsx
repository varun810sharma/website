"use client";

import React, { useEffect, useRef } from "react";

/**
 * DotMatrixCursor Component
 * Renders an ultra-high density "ink flow" effect around the mouse pointer.
 * The dots simulate a viscous fluid that is dragged by the mouse movement.
 */
export default function DotMatrixCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -2000, y: -2000 });
    const targetMouseRef = useRef({ x: -2000, y: -2000 });
    const lastMouseRef = useRef({ x: -2000, y: -2000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let dots: Dot[] = [];

        // Configuration for "Ink Flow" feel
        const spacing = 5; // Ultra-dense spacing for "ink" look
        const dotRadius = 0.7;
        const renderingRadius = 70; // Localized reveal
        const mouseRadius = 50;
        const springForce = 0.04; // Very weak spring for viscous feel
        const friction = 0.82; // Viscous drag
        const mouseVelocityInfluence = 0.4; // How much mouse movement "drags" the ink

        class Dot {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number = 0;
            vy: number = 0;
            opacity: number = 0;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
            }

            draw(mx: number, my: number) {
                if (!ctx) return;

                const dx = mx - this.x;
                const dy = my - this.y;
                const distSq = dx * dx + dy * dy;
                const renderDistSq = renderingRadius * renderingRadius;

                // Calculate opacity based on distance to cursor
                if (distSq < renderDistSq) {
                    const dist = Math.sqrt(distSq);
                    const targetOpacity = (1 - dist / renderingRadius) * 0.9;
                    this.opacity += (targetOpacity - this.opacity) * 0.3;
                } else {
                    this.opacity *= 0.7;
                }

                if (this.opacity < 0.01) return;

                ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            update(mx: number, my: number, mvx: number, mvy: number) {
                const dx = mx - this.x;
                const dy = my - this.y;
                const distSq = dx * dx + dy * dy;
                const mRadiusSq = mouseRadius * mouseRadius;

                // "Ink Flow" dragging logic: mouse velocity influences dots in range
                if (distSq < mRadiusSq) {
                    const dist = Math.sqrt(distSq);
                    const influence = (mouseRadius - dist) / mouseRadius;

                    // Drag dots along with mouse velocity
                    this.vx += mvx * influence * mouseVelocityInfluence;
                    this.vy += mvy * influence * mouseVelocityInfluence;

                    // Subtle repulsion to keep "fluid" separated
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * influence * 0.5;
                    this.vy -= Math.sin(angle) * influence * 0.5;
                }

                // Spring back to origin (slowly, viscously)
                const dxOrg = this.originX - this.x;
                const dyOrg = this.originY - this.y;
                this.vx += dxOrg * springForce;
                this.vy += dyOrg * springForce;

                this.vx *= friction;
                this.vy *= friction;

                this.x += this.vx;
                this.y += this.vy;
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            dots = [];

            // For density 5, we have a lot of dots. We only create dots in the viewport.
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);
            const offsetX = 0;
            const offsetY = 0;

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    dots.push(new Dot(offsetX + i * spacing, offsetY + j * spacing));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth mouse movement for fluid feel
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.2;
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.2;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Calculate mouse velocity for flow influence
            const mvx = targetMouseRef.current.x - lastMouseRef.current.x;
            const mvy = targetMouseRef.current.y - lastMouseRef.current.y;

            lastMouseRef.current = { ...targetMouseRef.current };

            const renderRadiusSq = (renderingRadius + 50) ** 2;

            for (const dot of dots) {
                const dx = mx - dot.x;
                const dy = my - dot.y;
                const distSq = dx * dx + dy * dy;
                const distToOriginSq = (dot.originX - dot.x) ** 2 + (dot.originY - dot.y) ** 2;

                // Optimization: only update dots that are near the mouse or not at origin
                if (distSq < renderRadiusSq || distToOriginSq > 0.01) {
                    dot.update(mx, my, mvx, mvy);
                }
                dot.draw(mx, my);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 9999,
                opacity: 0.95,
            }}
        />
    );
}
