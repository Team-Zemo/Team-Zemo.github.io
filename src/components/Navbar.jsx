import { useState, useEffect, useRef } from "react";
// global ko khali poppins k liye import kiya hai 
import '../styles/Global.scss';

export default function Navbar() {
  // State for scroll-based glassmorphism effects
  const [styles, setStyles] = useState({
    opacity: 1, // Initially visible - glass effect appears on scroll
    tint: 0.98, // No background tint initially
    blur: 0, // No blur initially
  });

  // State for animated capsule positioning
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0 });
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Current active navigation item
  const [activeLink, setActiveLink] = useState("home");

  // Refs for DOM manipulation and performance optimization
  const navRef = useRef(null);
  const ticking = useRef(false); // Prevents multiple scroll handlers from running

  // Scroll effect handler with performance optimization
  useEffect(() => {
    const onScroll = () => {
      // Use requestAnimationFrame for smooth 60fps updates
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          // Calculate scroll progress (0 to 1)
          const maxScroll = 320; // Pixels until effect reaches maximum
          const scrollProgress = Math.min(
            1,
            Math.max(0, window.scrollY / maxScroll)
          );

          // Apply easeOutCubic for smoother animation feel
          const easedProgress = 1 - Math.pow(1 - scrollProgress, 3);

          // Glass effect calculations - appears and intensifies on scroll
          // Opacity: visible to more visible on scroll (1 -> 0.95)
          const opacity = 1 - easedProgress * 0.3;

          // Tint: no tint to subtle background on scroll (0 -> 0.15)
          const tint = 1 + easedProgress * 0.09;

          // Blur: no blur to strong backdrop blur on scroll (0px -> 12px)
          const blur = easedProgress * 12;

          setStyles({ opacity, tint, blur });
          ticking.current = false;
        });
      }
    };

    // Add passive listener for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup on component unmount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Utility function to measure element position relative to navbar
  const measure = (element) => {
    if (!navRef.current || !element) return { left: 0, width: 0 };

    const navRect = navRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    return {
      left: elementRect.left - navRect.left,
      width: elementRect.width,
    };
  };

  // Position the active capsule under the current active link
  const placeActive = () => {
    const activeElement = navRef.current?.querySelector(
      `a[data-id="${activeLink}"]`
    );
    if (!activeElement) return;

    const { left, width } = measure(activeElement);
    setActiveStyle({ left, width });

    // Hide hover capsule when repositioning active capsule
    setHoverStyle((prev) => ({ ...prev, left, width, opacity: 0 }));
  };

  // Update active capsule position when active link changes
  useEffect(() => {
    placeActive();
  }, [activeLink]);

  // Recalculate positions on window resize
  useEffect(() => {
    const handleResize = () => placeActive();

    // Initial positioning
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mouse enter on navigation items
  const onMouseEnter = (id, event) => {
    // Don't show hover effect on already active item
    if (id === activeLink) {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    // Position hover capsule under hovered item
    const { left, width } = measure(event.currentTarget);
    setHoverStyle({ left, width, opacity: 1 });
  };

  // Hide hover capsule when mouse leaves entire navbar
  const onMouseLeaveCapsule = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  // Handle navigation item click
  const onClick = (id) => {
    setActiveLink(id);
  };

  // Navigation items configuration
  const navigationItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
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
    <header className="top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 background-transparent">
      {/* Left side: Team name */}
      <div className="text-xl font-bold">Team-Zemo</div>

      {/* Center: Navigation with glassmorphism effect */}
      <ul
        className="fixed left-1/2 -translate-x-1/2 flex items-center space-x-1 px-2 py-2 rounded-full justify-center max-w-full z-10 font-poppins font-bolder"
        ref={navRef}
        onMouseLeave={onMouseLeaveCapsule}
      >
        {/* Glassmorphism background with scroll-based effects */}
        <span
          className="absolute inset-0 rounded-full border border-white/20"
          style={{
            opacity: styles.opacity,
            backgroundColor: `rgba(255, 255, 255, ${styles.tint})`,
            backdropFilter: `blur(${styles.blur}px)`,
            WebkitBackdropFilter: `blur(${styles.blur}px)`, // Safari support
            transition: "all 0.25s ease-out",
          }}
        />

        {/* Active item indicator capsule */}
        <span
          className="absolute  rounded-full transition-all duration-300 ease-out h-8"
          style={activeStyle}
        />

        {/* Hover effect capsule */}
        <span
          className="absolute bg-black/5 rounded-full transition-all duration-200 ease-out h-8"
          style={hoverStyle}
        />

        {/* Navigation items */}
        {navigationItems.map((item) => (
          <li key={item.id} className="relative z-10">
      <a
  href={item.href}
  data-id={item.id}
  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${getActiveColor(item.id, activeLink === item.id)}`}
  onMouseEnter={(e) => onMouseEnter(item.id, e)}
  onClick={() => onClick(item.id)}
>
  {item.label}
</a>
          </li>
        ))}
      </ul>

      {/* Right side: Logo */}
      <div className="w-8 h-8">
        <img
          src="/src/assets/giga_chad_logo.png"
          alt="Team-Zemo Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </header>
  );
}
