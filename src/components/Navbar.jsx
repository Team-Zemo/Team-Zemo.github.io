import { useState, useEffect, useRef } from "react";
import "../styles/Global.scss";
import { NavLink } from "react-router-dom";
import gigaChadLogo from "../assets/giga_chad_logo.png";

export default function Navbar({
  backgroundColor = "transparent",
  textColor = "text-black",
  logoColor = "invert-0",
}) {
  // State for scroll-based glassmorphism effects
  const [styles, setStyles] = useState({
    opacity: 1,
    tint: 0.98,
    blur: 0,
  });

  // State for capsule animations
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0 });
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // State for active nav item
  const [activeLink, setActiveLink] = useState("home");

  // 🔹 FIX: State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Refs
  const navRef = useRef(null);
  const ticking = useRef(false);

  // Scroll effect (glassmorphism)
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const maxScroll = 320;
          const scrollProgress = Math.min(
            1,
            Math.max(0, window.scrollY / maxScroll)
          );
          const easedProgress = 1 - Math.pow(1 - scrollProgress, 3);

          const opacity = 1 - easedProgress * 0.3;
          const tint = 1 + easedProgress * 0.09;
          const blur = easedProgress * 12;

          setStyles({ opacity, tint, blur });
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Utility to measure item position
  const measure = (element) => {
    if (!navRef.current || !element) return { left: 0, width: 0 };
    const navRect = navRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return { left: elementRect.left - navRect.left, width: elementRect.width };
  };

  // Place active capsule
  const placeActive = () => {
    const activeElement = navRef.current?.querySelector(
      `a[data-id="${activeLink}"]`
    );
    if (!activeElement) return;

    const { left, width } = measure(activeElement);
    setActiveStyle({ left, width });
    setHoverStyle((prev) => ({ ...prev, left, width, opacity: 0 }));
  };

  useEffect(() => {
    placeActive();
  }, [activeLink]);

  useEffect(() => {
    const handleResize = () => placeActive();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMouseEnter = (id, event) => {
    if (id === activeLink) {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const { left, width } = measure(event.currentTarget);
    setHoverStyle({ left, width, opacity: 1 });
  };

  const onMouseLeaveCapsule = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const onClick = (id) => {
    setActiveLink(id);
    setIsMobileMenuOpen(false); // 🔹 Close mobile menu after click
  };

  const navigationItems = [
    { id: "home", label: "Home", to: "/" },
    { id: "about", label: "About", to: "/about" },
    { id: "projects", label: "Projects", to: "/projects" },
    { id: "contact", label: "Contact", to: "/contact" },
  ];

  const getActiveColor = (id, isActive) => {
    if (!isActive) return "text-black-700 hover:text-black";
    switch (id) {
      case "home":
        return "text-green-600 bg-[#020d03]";
      case "about":
        return "text-[#7ab4f5] bg-[#050e1a]";
      case "projects":
        return "text-[#fadda0] bg-[#141705]";
      case "contact":
        return "text-[#d15cff] bg-[#0f0517]";
      default:
        return "text-white";
    }
  };

  return (
    <header
      className={`top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 ${textColor}`}
      style={{ backgroundColor }}
    >
      {/* Left side */}
      <div className="text-xl font-bold">Team-Zemo</div>

      {/* Desktop Navigation */}
      <ul
        className="hidden md:fixed md:left-1/2 md:-translate-x-1/2 md:flex items-center space-x-1 px-2 py-2 rounded-full justify-center max-w-full z-10 font-poppins"
        ref={navRef}
        onMouseLeave={onMouseLeaveCapsule}
      >
        <span
          className="absolute inset-0 rounded-full border border-white/20"
          style={{
            opacity: styles.opacity,
            backgroundColor: `rgba(255, 255, 255, ${styles.tint})`,
            backdropFilter: `blur(${styles.blur}px)`,
            WebkitBackdropFilter: `blur(${styles.blur}px)`,
            transition: "all 0.25s ease-out",
          }}
        />
        <span
          className="absolute rounded-full transition-all duration-300 ease-out h-8"
          style={activeStyle}
        />
        <span
          className="absolute bg-black/5 rounded-full transition-all duration-200 ease-out h-8"
          style={hoverStyle}
        />
        {navigationItems.map((item) => (
          <li key={item.id} className="relative z-10">
            <NavLink
              to={item.to}
              data-id={item.id}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${getActiveColor(
                item.id,
                activeLink === item.id
              )}`}
              onMouseEnter={(e) => onMouseEnter(item.id, e)}
              onClick={() => onClick(item.id)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col justify-left items-center w-8 h-8 space-y-1 z-50"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6">
          <nav className="space-y-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/10"
                  }`
                }
                onClick={() => onClick(item.id)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Right side logo */}
      <div
        className={`w-8 h-8 ${isMobileMenuOpen ? "hidden" : "block"} md:block`}
      >
        <img
          src={gigaChadLogo}
          alt="Team-Zemo Logo"
          className={`w-full h-full object-contain ${logoColor}`}
        />
      </div>
    </header>
  );
}