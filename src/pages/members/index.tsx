"use client"

import { motion } from "framer-motion"
import styles from "./members.module.css"
import NeonIsometricMaze from "@/components/NeonIsometricMaze"
import HalftoneWaves from "@/components/halftoneWaves"



export default function Main() {
  return (
    <div className={styles.container}>
        {/* 1st section */}
    <div className="fixed inset-0 -z-10">
        <NeonIsometricMaze />
      </div>
      {/* 2nd section */}
      <main className={styles.main}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.hero}
        >
          <h1 className="text-white">Welcome to ADJ Lab</h1>
          <p className="text-gray-300">Advancing Cancer Research Through Innovation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.content}
        >
          <div className={styles.section}>
            <h2 className="text-white">Our Mission</h2>
            <p className="text-gray-300">
              Dedicated to understanding and developing innovative approaches in cancer treatment through cutting-edge
              research and collaboration.
            </p>
          </div>
        </motion.div>
      </main>
        {/* 3rd section */}
      <div className="fixed inset-0 -z-10">
        <HalftoneWaves />
      </div>
    </div>
  )
}

