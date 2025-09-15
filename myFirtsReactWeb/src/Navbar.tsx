import React, { useState } from "react";
import type { JSX } from "react";
import "./Navbar.css";

interface NavItem {
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "#Home" },
    { label: "Facilities", href: "#facilities" },
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
];

export default function Navbar(): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-container">

                <a href="#Home" className="brand">
                    <img src="/logo.png" alt="Vault-Tec Logo" className="logo" />
                    <span className="span">VAULT-TEC</span>
                </a>

                <nav className={`nav-links ${open ? "open" : ""}`}>
                    {NAV_ITEMS.map((item) => (
                        <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                            {item.label}
                        </a>
                    ))}

                </nav>

                <button
                    className="menu-btn"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                >
                    {open ? "✖" : "☰"}
                </button>
            </div>
        </header>
    );
}
