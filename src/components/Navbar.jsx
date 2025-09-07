import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Chadlogo from "./Chadlogo";

export default function Navbar({
                                   backgroundColor = "transparent",
                                   textColor = "text-black",
                               }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);

    const navigationItems = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/projects", label: "Projects" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <header
            className={`relative top-0 left-0 right-0 z-50 flex items-center justify-between px-15 py-4 text-black`}
            style={{ backgroundColor }}
        >
            {/* Left: Team-Zemo text */}
            <div className="text-xl font-bold">Team-Zemo</div>

            {/* Center: Capsule Nav */}
            <nav className=" fixed hidden md:flex   left-1/2 transform -translate-x-1/2 px-2 py-1.5  rounded-full backdrop-blur-md bg-white/40 border border-white/20">
                <ul className="flex space-x-2 relative z-10">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path} className="relative">
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-black rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <button
                                    className={`px-4 py-2 text-sm font-bold rounded-full relative z-10 ${
                                        isActive
                                            ? `${textColor} `
                                            : "text-black hover:text-shadow-black/70"
                                    }`}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Right: Chadlogo */}
            <div className="w-8 h-8 hidden md:block">
                <Chadlogo />
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 z-50"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
            >
        <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
        />
                <span
                    className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                        isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                    className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                        isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                />
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md z-50 md:hidden p-6"
            >
                <nav className="pt-16 space-y-4">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-black text-white"
                                        : "text-black hover:bg-black/10"
                                }`}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </motion.div>
        </header>
    );
}
