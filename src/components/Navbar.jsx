import { useState, useEffect, useRef } from "react";
import "./Navbar.scss";

export default function Navbar() {
  // State for scroll-based glassmorphism effects
  const [styles, setStyles] = useState({
    opacity: 1,   // Initially visible - glass effect appears on scroll
    tint: 0.98,      // No background tint initially
    blur: 0       // No blur initially
  });

  // State for animated capsule positioning
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0 });
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });
  
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
          const scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
          
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
      width: elementRect.width
    };
  };

  // Position the active capsule under the current active link
  const placeActive = () => {
    const activeElement = navRef.current?.querySelector(`a[data-id="${activeLink}"]`);
    if (!activeElement) return;

    const { left, width } = measure(activeElement);
    setActiveStyle({ left, width });
    
    // Hide hover capsule when repositioning active capsule
    setHoverStyle(prev => ({ ...prev, left, width, opacity: 0 }));
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
      setHoverStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    // Position hover capsule under hovered item
    const { left, width } = measure(event.currentTarget);
    setHoverStyle({ left, width, opacity: 1 });
  };

  // Hide hover capsule when mouse leaves entire navbar
  const onMouseLeaveCapsule = () => {
    setHoverStyle(prev => ({ ...prev, opacity: 0 }));
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

  return (
    <header className="navbar">
      {/* Left side: Team name */}
      <div className="team-name">Team-Zemo</div>

      {/* Center: Navigation with glassmorphism effect */}
      <ul
        className="navbar-links capsule-fixed"
        ref={navRef}
        onMouseLeave={onMouseLeaveCapsule}
      >
        {/* Glassmorphism background with scroll-based effects */}
        <span
          className="capsule-bg"
          style={{
            opacity: styles.opacity,
            backgroundColor: `rgba(255, 255, 255, ${styles.tint})`,
            backdropFilter: `blur(${styles.blur}px)`,
            WebkitBackdropFilter: `blur(${styles.blur}px)`, // Safari support
            transition: "all 0.25s ease-out"
          }}
        />

        {/* Active item indicator capsule */}
        <span className="active-background" style={activeStyle} />
        
        {/* Hover effect capsule */}
        <span className="hover-background" style={hoverStyle} />

        {/* Navigation items */}
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              data-id={item.id}
              className={activeLink === item.id ? "active" : ""}
              onMouseEnter={(e) => onMouseEnter(item.id, e)}
              onClick={() => onClick(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side: Logo */}
      <div className="navbar-logo">
        <img src="/src/assets/giga_chad_logo.png" alt="Team-Zemo Logo" />
      </div>
    </header>
  );
}