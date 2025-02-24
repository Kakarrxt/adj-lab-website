"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/pages/navbar/index"
import styles from "./page.module.css"
import NeonIsometricMaze from "@/components/NeonIsometricMaze"
import HalftoneWaves from "@/components/halftoneWaves"

export default function Main() {
  const { scrollYProgress } = useScroll()

  // Updated transform values for smoother transitions
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.5, 0])
  const firstSectionScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  
  const secondSectionOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.45, 0.6], [0, 1, 0.5, 0])
  const secondSectionScale = useTransform(scrollYProgress, [0.15, 0.3, 0.6], [0.8, 1, 0.8])
  
  const thirdSectionOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1])
  const thirdSectionScale = useTransform(scrollYProgress, [0.45, 0.6], [0.8, 1])

  return (
    <div className={styles.container}>
      <Navbar />
      
      {/* First Section - Vercel Animation */}
      <motion.div 
        className={styles.section}
        style={{ 
          opacity: firstSectionOpacity,
          scale: firstSectionScale,
        }}
      >
        <div className="fixed inset-0 -z-10">
          <NeonIsometricMaze />
        </div>
      </motion.div>

      {/* Second Section - Welcome Text */}
      <motion.div
        className={styles.section}
        style={{ 
          opacity: secondSectionOpacity,
          scale: secondSectionScale,
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
      <motion.div
        className={styles.section}
        style={{ 
          opacity: thirdSectionOpacity,
          scale: thirdSectionScale,
        }}
      >
        <div className="fixed inset-0 -z-10">
          <HalftoneWaves />
        </div>
      </motion.div>
    </div>
  )
}

