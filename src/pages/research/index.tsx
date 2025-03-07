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
  const sectionsRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const isImageInView = useInView(imageRef, { once: true });
  const areSectionsInView = useInView(sectionsRef, { once: true, margin: "-100px 0px" });
  
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
  
  const highlightText = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
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
            <h1>Lymphoma Research</h1>
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
                Optimising treatment strategies for <strong>aggressive lymphomas</strong> requires a precise understanding of tumour biology and its clinical implications. Our research focuses on identifying <strong>high-risk patients</strong> who may benefit from <strong>immunotherapeutic interventions</strong>, such as bispecific antibodies and CAR-T cell therapy, while improving diagnostic and therapeutic approaches for <strong>chemotherapy-resistant disease</strong>.
              </motion.p>

              <motion.div
                variants={highlightText}
                className={styles.highlightBox}
              >
                <p>A key priority is to <strong>bridge the gap</strong> between the growing array of therapeutic options and the need for <strong>clinically actionable strategies</strong> to guide treatment selection.</p>
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
                alt="Lymphoma Research Visualization"
                width={500}
                height={400}
                className={styles.researchImage} />
            </motion.div>
          </div>

          <motion.section
            ref={sectionsRef}
            initial="hidden"
            animate={areSectionsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className={styles.content}
          >
            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <h2>Molecular Profiling of DLBCL</h2>
              <p>
                Leveraging <strong>advanced spatial and molecular profiling</strong>, we have identified a subpopulation of tumor cells overexpressing <strong>MYC</strong> and <strong>BCL2</strong> while lacking <strong>BCL6</strong> (<span className={styles.highlight}>M+2+6−</span>) in diffuse large B-cell lymphoma (DLBCL) as a <strong>predictor of chemotherapy failure</strong>, leading to the development of an immunohistochemistry-based assay for treatment stratification. Our findings (<span className={styles.publication}>Cancer Discovery 2023</span>), provide a foundation for exploring the relevance of oncogene co-expression at the single-cell level in other cancers.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <h2>Personalized Treatment Optimization</h2>
              <p>
                We also explored innovative strategies to optimise drug combinations for patients with refractory lymphoma using the <strong>Quadratic Phenotypic Optimisation Platform (QPOP)</strong>. Our <strong>first-in-human trial</strong> (<span className={styles.publication}>Science Translational Medicine 2022</span>) demonstrated the clinical utility of QPOP in guiding personalized treatment approaches.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <h2>Immune Microenvironment Research</h2>
              <p>
                In advancing immune microenvironment research, our team characterised infiltrating macrophages in DLBCL using <strong>NanoString Digital Spatial Profiling (DSP)</strong> and identified clinically relevant macrophage subtypes with prognostic significance (<span className={styles.publication}>Nature Communications 2024</span>). 
              </p>
              <p>
                Furthermore, we elucidated mechanisms of immune regulation in lymphoma, demonstrating that the <strong>PRMT5-ZNF326 axis</strong> serves as a key mediator of innate immune activation in response to chemotherapy-induced replication stress (<span className={styles.publication}>Science Advances 2024</span>). These findings have <strong>important implications</strong> for the development of novel immunotherapy combinations.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.labCulture}>
              <h2>Lab Culture & Collaboration</h2>
              <p>
                Graduate students and post-doctoral researchers take the helm on exciting projects. We collaborate with both local and international colleagues to explore our findings in real-world clinical tissue collections. We welcome overseas students, NUH residents and medical students, who are passionate about translational cancer research.
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
                  <p>We are committed to fairness and transparency - <a href="https://sfdora.org/" target="_blank" rel="noopener noreferrer">sfdora.org</a></p>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
        </main>
      </div></>
  );
}