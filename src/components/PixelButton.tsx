import { ReactNode } from "react";

interface PixelButtonProps {
    href: string;
    icon?: ReactNode;
    label: string;
}

export default function PixelButton({ href, icon, label }: PixelButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn"
        >
            {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
            {label}
        </a>
    );
}
