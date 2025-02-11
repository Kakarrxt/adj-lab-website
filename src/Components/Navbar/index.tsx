"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { name: "Research", href: "/" },
  { name: "Anand", href: "/" },
  { name: "Lab Members", href: "/" },
  { name: "Publication", href: "/" },
  { name: "Contact", href: "/" },
];

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navContent}>
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">ADJ</Link>
        </motion.div>

        <div className={styles.navItems}>
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              className={styles.navItem}
              onHoverStart={() => setHoveredItem(item.name)}
              onHoverEnd={() => setHoveredItem(null)}
              whileHover={{ y: -2 }}
            >
              <Link href={item.href}>{item.name}</Link>
              <motion.div
                className={styles.underline}
                initial={false}
                animate={{
                  width: hoveredItem === item.name ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}