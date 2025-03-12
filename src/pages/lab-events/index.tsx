"use client"
import { motion } from "framer-motion";

import NeonIsometricMaze from "@/components/NeonIsometricMaze";
import styles from "./lab-events.module.css"
import CircularGallery from "@/components/CircularGallery/CircularGallery";
import Curve from '@/components/Curve/Curve'

export default function LabEvents(){

  
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };
  
  
    const charAnimation = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.04,
          duration: 0.8,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      }),
    };
  
    const title = "ADJ Lab Events";

    return(
        <>
        <Curve backgroundColor="#f1f1f1">
        <motion.div 
        className={styles.sectionTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
                  {/*
          <NeonIsometricMaze />
        */}
        </div>
      </motion.div>
      <div className={styles.container}>
        <main className={styles.main}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.header}
          >
            <h1 aria-label={title}>
              {title.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charAnimation}
                  initial="hidden"
                  animate="visible"
                  className={styles.animatedChar}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <div className={styles.underline} />
          </motion.div>
          
        
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={styles.circularGallery}
          >
            <div style={{ height: '700px', position: 'relative' }}>
            <CircularGallery bend={3} textColor="#6b46c1" borderRadius={0.05} />
            </div>
          </motion.div>
          
          </main>
          </div>

        </Curve>
        </>
    )
}