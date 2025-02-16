// Components/Research/index.tsx
"use client"

import { motion } from "framer-motion";
import styles from "./Research.module.css";
import Navbar from "../navbar/index";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ResearchPage() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <h1>Cancer Cartography</h1>
          <div className={styles.underline} />
        </motion.div>

        <motion.section 
          ref={textRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className={styles.content}
        >
          <motion.p variants={fadeInUp} className={styles.intro}>
            We are interested in the effects of genotoxic chemotherapy on the immune mileu in cancer. 
            This interest stems from 2 key observations:
          </motion.p>

          <motion.div 
            variants={staggerChildren}
            className={styles.observations}
          >
            <motion.div variants={fadeInUp} className={styles.observation}>
              <span className={styles.number}>01</span>
              <p>Defects in DNA repair in cancer contribute to the generation of immunogenic nucleic acids and peptide neo-antigens</p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.observation}>
              <span className={styles.number}>02</span>
              <p>Genotoxic chemotherapy activates innate and adaptive immune responses through immunogenic cell death and cytosolic nucleic acid sensors</p>
            </motion.div>
          </motion.div>

          <motion.p variants={fadeInUp} className={styles.hypothesis}>
            We hypothesize that intracellular changes in cancer differentially affect the ability of distinct 
            chemotherapeutics to result in immune clearance of tumours. A comprehensive understanding of these 
            intracellular components that regulate immune activation after DNA damage will facilitate the 
            development of predictive biomarkers for chemotherapy-immunotherapy combination trials.
          </motion.p>
        </motion.section>
      </main>
    </div>
  );
}