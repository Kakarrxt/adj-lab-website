"use client"

import { motion,} from "framer-motion"
import Navbar from "@/pages/navbar/index"
import styles from "./page.module.css"
import NeonIsometricMaze from "@/components/NeonIsometricMaze"
import Footer from "@/pages/footer/index"

export default function Main() {

  return (
    <div className={styles.container}>
      <Navbar />
      <motion.div 
        className={styles.sectionTop}
      >
        <div className="fixed inset-0 -z-10" >
          <NeonIsometricMaze />
        </div>
      </motion.div>

      {/* Second Section - Welcome Text */}
      <motion.div
        className={styles.section}
        style={{ 
        }}
      >
        <div className={styles.hero}>
          <h1 className="text-white">Welcome to ADJ Lab</h1>
          <p className="text-gray-300">Advancing Cancer Research Through Innovation</p>
        </div>

        <motion.div className={styles.content}>
          <div className={styles.contentSection}>
            <h2>Our Mission</h2>
            <p>
              Dedicated to understanding and developing innovative approaches
              in cancer treatment through cutting-edge research and collaboration.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Third Section - Second Animation */}
      <Footer />
    </div>
  )
}

