"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
  const pathname = usePathname();
  
  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navContent}>
        <motion.div
          className={styles.logoContainer}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className={styles.logo}>
            ADJ
          </Link>
        </motion.div>

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
      </div>
    </motion.nav>
  );
}