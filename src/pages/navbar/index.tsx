"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { usePathname } from 'next/navigation';

const navItems = [
  { name: "Research", href: "/research" },
  { name: "Anand", href: "/anand" },
  { name: "Lab Members", href: "/members" },
  { name: "Publication", href: "/publications" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${styles.navContent} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <motion.div
          className={styles.logoContainer}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className={styles.logo}>
            ADJ
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div className={styles.navItemsContainer}>
          <div className={styles.navItems}>
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                className={`${styles.navItem} ${
                  pathname === item.href ? styles.active : ""
                }`}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link href={item.href}>{item.name}</Link>
                {(hoveredItem === item.name || pathname === item.href) && (
                  <motion.div
                    className={styles.activeBackground}
                    layoutId="activeBackground"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className={styles.mobileMenuIcon}></div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && (
            <motion.div 
              className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  className={`${styles.mobileNavItem} ${
                    pathname === item.href ? styles.mobileActiveItem : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    y: isMobileMenuOpen ? 0 : 20
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: isMobileMenuOpen ? navItems.indexOf(item) * 0.1 : 0
                  }}
                >
                  <Link href={item.href}>{item.name}</Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}