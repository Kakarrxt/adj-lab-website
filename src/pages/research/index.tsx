"use client"
import { motion } from "framer-motion";
import styles from "./Research.module.css";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import NeonIsometricMaze from "@/components/NeonIsometricMaze";

export default function ResearchPage() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const isImageInView = useInView(imageRef, { once: true });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
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
    <>
    <motion.div 
      className={styles.sectionTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <NeonIsometricMaze />
      </div>
    </motion.div>
    <div className={styles.container}>
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

          <div className={styles.heroSection}>
            <motion.div
              ref={textRef}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className={styles.heroContent}
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
            </motion.div>

            <motion.div
              ref={imageRef}
              className={styles.heroImage}
              initial="hidden"
              animate={isImageInView ? "visible" : "hidden"}
              variants={fadeInLeft}
            >
              <Image
                src="/media/Research.png"
                alt="Cancer Research Visualization"
                width={500}
                height={400}
                className={styles.researchImage} />
            </motion.div>
          </div>

          <motion.section
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className={styles.content}
          >
            <motion.p variants={fadeInUp} className={styles.hypothesis}>
              We hypothesize that intracellular changes in cancer differentially affect the ability of distinct
              chemotherapeutics to result in immune clearance of tumours. A comprehensive understanding of these
              intracellular components that regulate immune activation after DNA damage will facilitate the
              development of predictive biomarkers for chemotherapy-immunotherapy combination trials.
            </motion.p>

            <motion.div variants={fadeInUp} className={styles.themesSection}>
              <h2>Research Themes</h2>
              <p>Accordingly, current work in my laboratory spans two broad themes:</p>
              <motion.div variants={staggerChildren} className={styles.themesList}>
                <motion.div variants={fadeInUp} className={styles.themeItem}>
                  <span className={styles.themeNumber}>1</span>
                  <div className={styles.themeContent}>
                    <h3>Intracellular Changes and Immune Response</h3>
                    <p>Intracellular changes in cancer that influence the activation of the immune response after DNA damage</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className={styles.themeItem}>
                  <span className={styles.themeNumber}>2</span>
                  <div className={styles.themeContent}>
                    <h3>Combination Strategies</h3>
                    <p>Combination strategies to potentiate the action of genotoxic chemotherapy, through cell-intrinsic and cell-extrinsic mechanisms</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.facilitiesSection}>
              <h2>Research Infrastructure</h2>
              <p>To facilitate the above studies, we have:</p>
              <motion.ul variants={staggerChildren} className={styles.facilitiesList}>
                <motion.li variants={fadeInUp}>Acquired a range of cell line models for epithelial and lymphoid cancers</motion.li>
                <motion.li variants={fadeInUp}>Setup systems and assays for DNA repair and immune activation studies in-vitro</motion.li>
                <motion.li variants={fadeInUp}>Setup platforms for quantitative microscopy in histological material, to interrogate immune modulation pathways in samples of human cancer</motion.li>
                <motion.li variants={fadeInUp}>Established international and local collaborations for the acquisition of well-annotated clinical samples</motion.li>
                <motion.li variants={fadeInUp}>Established connections with pharmaceutical companies and medical technology companies, to translate our research findings to clinical trials and biomarker development</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.labCulture}>
              <h2>Lab Culture & Collaboration</h2>
              <p>
                Graduate students and post-doctoral researchers in the lab lead specific projects, and we collaborate with local and overseas colleagues to test our findings in relevant clinical tissue collections. The ADJ lab also hosts overseas elective students, NUH residents and medical students who are interested in translational cancer research.
              </p>
              <div className={styles.commitments}>
                <motion.div variants={fadeInRight} className={styles.commitment}>
                  <span>#heforshe</span>
                  <p>We are committed to promoting diversity in science</p>
                </motion.div>
                <motion.div variants={fadeInRight} className={styles.commitment}>
                  <span>#scienceisnotapyramid</span>
                  <p>We foster a culture of mutual respect</p>
                </motion.div>
                <motion.div variants={fadeInRight} className={styles.commitment}>
                  <span>DORA</span>
                  <p>ADJ is a DORA signatory - <a href="https://sfdora.org/" target="_blank" rel="noopener noreferrer">sfdora.org</a></p>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
        </main>
      </div></>
  );
}