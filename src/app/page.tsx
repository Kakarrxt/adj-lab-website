// App/main.tsx
"use client"

import { motion } from "framer-motion";
import Navbar from '@/pages/navbar/index';
import styles from './page.module.css';

export default function Main() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.hero}
        >
          <h1>Welcome to ADJ Lab</h1>
          <p>Advancing Cancer Research Through Innovation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.content}
        >
          <div className={styles.section}>
            <h2>Our Mission</h2>
            <p>Dedicated to understanding and developing innovative approaches in cancer treatment through cutting-edge research and collaboration.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}