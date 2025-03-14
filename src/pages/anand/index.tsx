"use client"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Anand.module.css";
import { Twitter, Linkedin, Mail, Award, Building, BookOpen, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import NeonIsometricMaze from "@/components/NeonIsometricMaze";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";

export default function AnandPage() {


  const [init, setInit] = useState(false);
  const [activeTab, setActiveTab] = useState('affiliations');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize particles
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    
    // Set page as loaded after a slight delay for animations
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Simplified fade in animation - less clunky
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const tabVariants = {
    active: {
      borderBottom: "3px solid #6b46c1",
      color: "#6b46c1",
      fontWeight: 600,
      backgroundColor: "rgba(107, 70, 193, 0.08)",
      transition: { duration: 0.3 }
    },
    inactive: {
      borderBottom: "3px solid transparent",
      color: "#6b7280",
      fontWeight: 400,
      backgroundColor: "transparent",
      transition: { duration: 0.3 }
    },
    hover: {
      backgroundColor: "rgba(107, 70, 193, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  // Simplified content transition - less jumpy
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Primary affiliations
  const primaryAffiliations = [
    "Principal Investigator and Facility Head (Microscopy and Multiplexed Assay Core), Cancer Science Institute of Singapore, NUS",
    "Senior Consultant, Department of Haematology-Oncology, National University Cancer Institute, Singapore",
    "Assistant Professor; Department of Medicine, Yong Loo Lin School of Medicine, NUS",
  ];

  // Additional positions
  const additionalPositions = [
    "Platform leader and EXCO member; Translational Research Integration and Support platform - Singapore Translational Cancer Consortium",
    "Facility head; CSI Microscopy and Multiplex Assays (MMA) Core",
    "Program Chair, Musculoskeletal Oncology, Sarcoma; NCIS, NUH",
    "Senior Principal Investigator; Institute of Molecular and Cell Biology (IMCB) - A*STAR",
    "Research Director; NCIS, NUH"
  ];

  const awards = [
    { year: "2025", description: "Clinician Scientist Award - Senior Investigator, National Medical Research Council, Singapore" },
    { year: "2021", description: "Clinician Scientist Award - Investigator, National Medical Research Council, Singapore" },
    { year: "2016", description: "Clinician-Scientist Transition Award, National Medical Research Council, Singapore" },
    { year: "2015", description: "NUHS Clinician-Scientist Program Award, National University Hospital, Singapore" },
    { year: "2014", description: "NRF Singapore nomination to attend the 64th Lindau Nobel meeting (Medicine and Physiology)" },
    { year: "2011", description: "Academic Development Award, National University Hospital, Singapore" },
    { year: "2009-2010", description: "Junior Research Fellowship, Wolfson College, Cambridge" },
    { year: "2005-2008", description: "Gates Cambridge Scholarship, Gates Cambridge Trust, University of Cambridge, UK" }
  ];

  // Updated particles options with darker colors and improved settings
  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#5a3da5", // Darker purple color for particles
      },
      links: {
        color: "#8a6ad6", // Slightly darker link color
        distance: 150,
        enable: true,
        opacity: 0.3, // Increased opacity from 0.2 to 0.3
        width: 1.2, // Slightly wider links
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 0.7, // Slightly slower speed for smoother movement
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 70, // Reduced from 80 to 70 for less cluttered appearance
      },
      opacity: {
        value: 0.35, // Increased from 0.25 to 0.35 for more visibility
        anim: {
          enable: true,
          speed: 0.4, // Slightly slower animation
          opacity_min: 0.15, // Higher minimum opacity
          sync: false
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4.5 }, // Slightly larger max size
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse" as const,
        },
      },
      modes: {
        repulse: {
          distance: 120, // Increased from 100 to 120
          duration: 0.5, // Slightly longer duration
        },
      },
    },
    detectRetina: true,
  };

  // Simplified list item animation - less clunky when loading items
  const listItemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // Reduced delay multiplier from 0.1 to 0.05
        duration: 0.3, // Reduced duration from 0.4 to 0.3
      }
    })
  };

  const title = "Anand JEYASEKHARAN";

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

  return (
    <Curve backgroundColor="#f1f1f1">
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.backgroundGradient}></div>
      
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className={styles.particles}
        />
      )}
      
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
        <Aurora
          colorStops={["#A855F7", "#9333EA", "#6B21A8"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        </div>
      </motion.div>
      
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
            <div className={styles.titleUnderline} />
          </motion.div>
        <motion.div 
          className={styles.profile}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1 
              }
            }
          }}
        >
          <motion.div
            className={styles.imageContainer}
            variants={fadeInUp}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/media/ADJ-Profile2.png"
                alt="Anand Jeyasekharan"
                width={300}
                height={400}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageOverlay}></div>
            </div>
            
            <motion.div className={styles.socialLinks}>
              <motion.a
                href="mailto:csiadj@nus.edu.sg"
                whileHover={{ scale: 1.1, backgroundColor: "#6b46c1", color: "white" }}
                whileTap={{ scale: 0.95 }}
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fcsi.nus.edu.sg%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Eadj_23&region=follow_link&screen_name=adj_23"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: "#6b46c1", color: "white" }}
                whileTap={{ scale: 0.95 }}
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/anand-jeyasekharan-920694141/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: "#6b46c1", color: "white" }}
                whileTap={{ scale: 0.95 }}
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div className={styles.content}>
            {/* <motion.h1
              variants={fadeInUp}
              className={styles.name}
            >
              Anand JEYASEKHARAN
              <span className={styles.underline}></span>
            </motion.h1> */}
            
            <motion.div
              variants={fadeInUp}
              className={styles.description}
            >
              <p>
                Work in the ADJ laboratory focuses on how the immune system recognizes cancer cells upon treatment with DNA damaging chemotherapy.
                Our eventual aim is to use this information to guide the rational design of immunotherapy-chemotherapy combinations for cancer treatment.
                Our research involves both fundamental research (molecular and cellular biology of chemotherapy responses) and translational research
                (using clinical samples) in a variety of cancer types. We have a specific interest in lymphomas; and work closely with colleagues in
                the NUH Lymphoma team to develop novel therapeutic strategies for clinical use.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className={styles.infoTabs}
            >
              <div className={styles.tabsContainer}>
                <motion.div
                  className={`${styles.tabButton} ${activeTab === 'affiliations' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('affiliations')}
                  variants={tabVariants}
                  animate={activeTab === 'affiliations' ? 'active' : 'inactive'}
                  whileHover={activeTab === 'affiliations' ? undefined : 'hover'}
                >
                  <Building size={18} />
                  <span>Affiliations</span>
                </motion.div>
                <motion.div
                  className={`${styles.tabButton} ${activeTab === 'awards' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('awards')}
                  variants={tabVariants}
                  animate={activeTab === 'awards' ? 'active' : 'inactive'}
                  whileHover={activeTab === 'awards' ? undefined : 'hover'}
                >
                  <Award size={18} />
                  <span>Honors & Awards</span>
                </motion.div>
              </div>
              
              <div className={styles.tabContent}>
                <AnimatePresence mode="wait">
                  {activeTab === 'affiliations' && (
                    <motion.div
                      key="affiliations"
                      className={styles.affiliationsList}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      <ul>
                        {primaryAffiliations.map((affiliation, index) => (
                          <motion.li
                            key={`primary-${index}`}
                            custom={index}
                            variants={listItemVariants}
                            className={styles.primaryAffiliation}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          >
                            <span className={styles.listIcon}><ChevronRight size={16} /></span>
                            {affiliation}
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.h3 
                        className={styles.additionalPositionsTitle}
                        variants={fadeInUp}
                      >
                        <BookOpen size={16} className={styles.sectionIcon} />
                        Additional Positions
                      </motion.h3>
                      
                      <ul className={styles.additionalPositionsList}>
                        {additionalPositions.map((position, index) => (
                          <motion.li
                            key={`additional-${index}`}
                            custom={index}
                            variants={listItemVariants}
                            className={styles.additionalPosition}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          >
                            <span className={styles.listIconSmall}><ChevronRight size={14} /></span>
                            {position}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  
                  {activeTab === 'awards' && (
                    <motion.div
                      key="awards"
                      className={styles.awardsList}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      <ul>
                        {awards.map((award, index) => (
                          <motion.li
                            key={index}
                            custom={index}
                            variants={listItemVariants}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          >
                            <span className={styles.awardYear}>{award.year}</span>
                            <span className={styles.awardDescription}>{award.description}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
    </Curve>
  );
}