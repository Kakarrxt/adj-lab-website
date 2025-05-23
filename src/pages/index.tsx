"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Curve from '@/components/Curve/Curve'
import { ResearchTopics, Publications } from "@/constants";


interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
}

interface Publication {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  abstract?: string;
}

export default function ResearchPage() {

  const [animationStage, setAnimationStage] = useState<'initial' | 'map-zoom' | 'cells-zoom' | 'cells-out' | 'cells-fade' | 'map-fade-in' | 'reverse-map-zoom'>('initial');
  const [selectedResearch, setSelectedResearch] = useState<ResearchTopic | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const researchRef = useRef(null);
  const publicationsRef = useRef(null);
  const isResearchInView = useInView(researchRef, { once: true, margin: "-100px" });
  const isPublicationsInView = useInView(publicationsRef, { once: true, margin: "-100px" });
  const filterRef = useRef(null);
  const isFilterInView = useInView(filterRef, { once: true, margin: "-150px" });
  const [backgroundExpanded, setBackgroundExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

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
  


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    // Wait for 5 seconds before expanding the background
    const expansionTimeout = setTimeout(() => {
      setBackgroundExpanded(true);
    }, 3000);
    
    return () => {
      clearTimeout(expansionTimeout);
    };
  }, []);
  

  
  useEffect(() => {
    const animationSequence = () => {
      setAnimationStage('initial');
      setTimeout(() => setAnimationStage('map-zoom'), 1000); // Faster transitions
      setTimeout(() => setAnimationStage('cells-zoom'), 2800);
      setTimeout(() => setAnimationStage('cells-out'), 4600);
      setTimeout(() => setAnimationStage('cells-fade'), 6400);
      setTimeout(() => setAnimationStage('map-fade-in'), 7200);
      setTimeout(() => setAnimationStage('reverse-map-zoom'), 9000);
      setTimeout(() => setAnimationStage('initial'), 10800);
    };

    const initialTimeout = setTimeout(animationSequence, 200);
    const interval = setInterval(animationSequence, 12000); 
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const backgroundVariants = {
    initial: {
      scale: 1,
      opacity: 0.3,
      filter: "brightness(0.9)",
      transition: { duration: 1.0, ease: [0.33, 1, 0.68, 1] }
    },
    'map-zoom': {
      scale: 1.2,
      opacity: 0.5,
      filter: "brightness(1.0)",
      transition: { duration: 1.8, ease: [0.33, 1, 0.68, 1] }
    },
    'cells-zoom': {
      scale: 1.5,
      opacity: 0.7,
      filter: "brightness(1.1)",
      transition: { duration: 1.8, ease: [0.33, 1, 0.68, 1] }
    },
    'cells-out': {
      scale: 1.5,
      opacity: 0.7,
      filter: "brightness(1.1)",
      transition: { duration: 1.8, ease: [0.33, 1, 0.68, 1] }
    },
    'cells-fade': {
      scale: 1.2,
      opacity: 0.3,
        transition: { duration: 1, ease: "easeInOut" }
    },
    'map-fade-in': {
      scale: 1,
      opacity: 0.5,
        transition: { duration: 2, ease: "easeInOut" }
    },
    'reverse-map-zoom': {
      scale: 1,
      opacity: 0.3,
        transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const cellsVariants = {
    'cells-zoom': {
      scale: 1.8,
      opacity: 0.7,
        transition: { duration: 2, ease: "easeInOut" }
    },
    'cells-out': {
      scale: 1.5,
      opacity: 0.7,
        transition: { duration: 2, ease: "easeInOut" }
    },
    'cells-fade': {
      scale: 1.2,
      opacity: 0.2,
        transition: { duration: 1, ease: "easeInOut" }
    },
    'map-fade-in': {
      scale: 1,
      opacity: 0,
        transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const filteredResearch = filter
    ? ResearchTopics.filter(topic => topic.tags.includes(filter))
    : ResearchTopics;
  
  return (
    
    <>
     {!isMobile && <Curve backgroundColor="#f1f1f1">
        <div className={styles.backgroundGradient}></div>
      </Curve>}
    <div className={styles.container}>
      {/* Dynamic Hero Section */}
      <section className={styles.heroSection}>
        <AnimatePresence>
          <motion.div
            key="nautical-map"
            className={styles.backgroundImage}
            variants={backgroundVariants}
            animate={animationStage}
            initial="initial"
          >
            <Image
              src="/media/home/Nautical.png"
              alt="Nautical Map Background"
              layout="fill"
              objectFit="cover"
              priority />
          </motion.div>

          {(animationStage === 'cells-zoom' || animationStage === 'cells-out' || animationStage === 'cells-fade') && (
            <motion.div
              key="cells"
              className={styles.backgroundImage}
              style={{ zIndex: 2 }}
              variants={cellsVariants}
              animate={animationStage}
              initial={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <Image
                src="/media/home/cells.jpg"
                alt="Cancer Cells"
                layout="fill"
                objectFit="cover"
                priority />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`${styles.heroContentBackground} ${backgroundExpanded ? styles.expanded : ''}`}></div>
        <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 1.2, ease: "easeOut" }
            }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              ADJ Laboratory
            </motion.h1>
            <motion.div className={styles.underline}
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              Spatial Analysis in Lymphoma
            </motion.p>
          </motion.div>


      </section>

      {/* Research Topics Section */}
      <section
        ref={researchRef}
        className={styles.researchSection}
      >
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isResearchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
          className={styles.sectionTitle}
        >
          <motion.span
            initial={{ backgroundSize: "0% 2px" }}
            animate={isResearchInView ? { backgroundSize: "100% 2px" } : {}}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
            style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 bottom",
              paddingBottom: "6px"
            }}
          >
            Our Research Focus
          </motion.span>
        </motion.h2>
        
        <motion.div 
          className={styles.researchContentContainer}
          initial={{ opacity: 0 }}
          animate={isResearchInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.25 }}
        >
          <motion.div 
            className={styles.researchContent}
            initial={{ opacity: 0, y: 20 }}
            animate={isResearchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
          >
            <div className={styles.researchLayout}>
              <div className={styles.researchText}>
                <p>Our research aims to chart a detailed <span className={styles.highlight}>"cancer cartography"</span> of aggressive lymphomas by mapping spatial and molecular tumour features to clinical outcomes.</p>
                
                <p>By integrating <span className={styles.highlight}>high-resolution profiling tools</span> such as digital spatial profiling and single-cell immunohistochemistry, we uncover intratumoural heterogeneity and immune microenvironment dynamics that drive treatment resistance.</p>
                
                <motion.div 
                  className={styles.keyFinding}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className={styles.keyFindingIcon}>
                    <span>★</span>
                  </div>
                  <div className={styles.keyFindingContent}>
                    <h3>Key Discovery</h3>
                    <p>We identified a <span className={styles.highlight}>high-risk M+2+6−</span> subpopulation in diffuse large B-cell lymphoma predictive of chemotherapy failure, enabling precise patient stratification.</p>
                  </div>
                </motion.div>
              </div>
              
              <div className={styles.researchImageContainer}>
              <Image
                src="/media/home/research.png"
                alt="Research"
                fill={true}
                style={{ objectFit: "cover", objectPosition: "center" }}
                className={styles.researchImage}
              />
              </div>
            </div>
            
            <p>Complementing this, we pioneered the use of the <span className={styles.highlight}>QPOP platform</span> to personalise drug combinations, with promising clinical results.</p>
            
            <motion.div 
              className={styles.researchConclusion}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <p>Our discoveries, spanning from tumour-intrinsic oncogenic co-expression to macrophage-driven immune regulation, collectively advance a framework for <span className={styles.highlightBox}>precision immunotherapy</span>—transforming static tumour classification into dynamic, actionable maps for guiding next-generation treatment strategies.</p>
            </motion.div>
          </motion.div>

   {/* Lab Culture */}

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

            
        </motion.div>


      </section>

      {/* Publications Section - Faster animations with thin underline */}
      <section
        ref={publicationsRef}
        className={styles.publicationsSection}
      >
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isPublicationsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
          className={styles.sectionTitle}
        >
          <motion.span
            initial={{ backgroundSize: "0% 2px" }} // Thin 2px underline
            animate={isPublicationsInView ? { backgroundSize: "100% 2px" } : {}}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
            style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 bottom",
              paddingBottom: "6px"
            }}
          >
            Selected Publications
          </motion.span>
        </motion.h2>

        <motion.div 
          className={styles.publicationsContainer}
          initial={{ opacity: 0 }}
          animate={isPublicationsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.15 }}
        >
          {Publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              className={styles.publicationCard}
              initial={{ opacity: 0, x: -10, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.35,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.03 // Much faster stagger effect
              }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: '#f9f9f9',
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
              onClick={() => setSelectedPublication(pub)}
            >
              <motion.div 
                className={styles.publicationHighlight}
                initial={{ width: 0 }}
                whileHover={{ width: "3px" }} // Thinner highlight bar
                transition={{ duration: 0.15 }}
              ></motion.div>
              
              <div className={styles.publicationContent}>
                <motion.h3 
                  className={styles.publicationTitle}
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {pub.title}
                </motion.h3>
                <div className={styles.publicationInfoLine}>
                  <p className={styles.publicationJournal}>{pub.journal}</p>
                  <motion.p 
                    className={styles.publicationYear}
                    whileHover={{ 
                      fontWeight: "bold",
                      color: "rgba(0,0,0,0.8)",
                      transition: { duration: 0.15 }
                    }}
                  >
                    {pub.year}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Research Modal - Faster animations */}
      <AnimatePresence>
        {selectedResearch && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            onClick={() => setSelectedResearch(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className={styles.closeButton}
                onClick={() => setSelectedResearch(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                ×
              </motion.button>
              <motion.div 
                className={styles.modalHeader}
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <h2>{selectedResearch.title}</h2>
                <div className={styles.modalTags}>
                  {selectedResearch.tags.map((tag, index) => (
                    <motion.span 
                      key={tag} 
                      className={styles.tag}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + (index * 0.03) }}
                      whileHover={{ 
                        backgroundColor: "rgba(0,0,0,0.8)", 
                        color: "#fff",
                        transition: { duration: 0.15 }
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className={styles.modalImageContainer}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              >
                <Image
                  src={selectedResearch.image}
                  alt={selectedResearch.title}
                  layout="fill"
                  objectFit="cover" />
              </motion.div>
              <motion.p 
                className={styles.modalDescription}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
              >
                {selectedResearch.fullDescription}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publication Modal - Faster animations */}
      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            onClick={() => setSelectedPublication(null)}
          >
            <motion.div
              className={`${styles.modalContent} ${styles.publicationModalContent}`}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className={styles.closeButton}
                onClick={() => setSelectedPublication(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                ×
              </motion.button>
              <motion.div 
                className={styles.publicationModalHeader}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <motion.div 
                  className={styles.publicationModalYear}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  {selectedPublication.year}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  {selectedPublication.title}
                </motion.h2>
              </motion.div>
              <div className={styles.publicationModalBody}>
                {[
                  { title: "Authors", content: selectedPublication.authors },
                  { title: "Journal", content: selectedPublication.journal },
                  { title: "DOI", content: selectedPublication.doi, isDoi: true },
                  ...(selectedPublication.abstract ? [{ title: "Abstract", content: selectedPublication.abstract, isAbstract: true }] : [])
                ].map((section, index) => (
                  <motion.div 
                    key={section.title}
                    className={styles.publicationModalSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.15 + (index * 0.03) }}
                  >
                    <h3>{section.title}</h3>
                    {section.isDoi ? (
                      <motion.a
                        href={`https://doi.org/${section.content}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.publicationDoi}
                        whileHover={{ color: "#0066cc", textDecoration: "underline" }}
                      >
                        {section.content}
                      </motion.a>
                    ) : (
                      <p className={section.isAbstract ? styles.publicationAbstract : ""}>
                        {section.content}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}