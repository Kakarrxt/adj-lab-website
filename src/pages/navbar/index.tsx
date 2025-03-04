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
  { name: "Alumni", href: "/alumni" },
  { name: "Publication", href: "/publications" },
  { name: "Join Us", href: "/join-us" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Responsive mobile check with debounce
  useEffect(() => {
    const handleResize = () => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      
      // Debounce to improve performance
      let timeoutId: NodeJS.Timeout;
      const debouncedCheck = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(checkMobile, 100);
      };

      debouncedCheck();
      window.addEventListener('resize', debouncedCheck);
      
      return () => {
        window.removeEventListener('resize', debouncedCheck);
        clearTimeout(timeoutId);
      };
    };

    handleResize();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 120 
      }}
    >
      <div 
        className={`${styles.navContent} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        style={{
          backgroundColor: isHovered 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(255, 255, 255, 0.5)'
        }}
      >
        <motion.div
          className={styles.logoContainer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className={styles.logo}>
            ADJ
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <motion.div 
            className={styles.navItemsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.navItems}>
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  className={`${styles.navItem} ${
                    pathname === item.href ? styles.active : ""
                  }`}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button 
            className={styles.mobileMenuButton} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <div className={`${styles.mobileMenuIcon} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}></div>
          </motion.button>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  className={`${styles.mobileNavItem} ${
                    pathname === item.href ? styles.mobileActiveItem : ""
                  }`}
                  variants={mobileItemVariants}
                >
                  <Link href={item.href} onClick={toggleMobileMenu}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}