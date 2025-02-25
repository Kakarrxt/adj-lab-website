"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Anand.module.css";
import { Twitter, Linkedin, Mail, Award, Building } from "lucide-react";
import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import NeonIsometricMaze from "@/components/NeonIsometricMaze";

export default function AnandPage() {
  const [init, setInit] = useState(false);
  const [activeTab, setActiveTab] = useState('affiliations');
  
  // Initialize particles
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const tabVariants = {
    active: {
      borderBottom: "3px solid #6b46c1",
      color: "#6b46c1",
      fontWeight: 600,
      transition: { duration: 0.3 }
    },
    inactive: {
      borderBottom: "3px solid transparent",
      color: "#6b7280",
      fontWeight: 400,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: { duration: 0.4 }
    }
  };

  const affiliations = [
    "Principal Investigator and Facility Head (Microscopy and Multiplexed Assay Core), Cancer Science Institute of Singapore, NUS",
    "Senior Consultant, Department of Haematology-Oncology, National University Cancer Institute, Singapore",
    "Assistant Professor; Department of Medicine, Yong Loo Lin School of Medicine, NUS",
    "Platform lead (Translational Research Integration and Support), Singapore Translational Cancer Consortium (STCC)"
  ];

  const awards = [
    { year: "2021", description: "Clinician Scientist Award, National Medical Research Council, Singapore" },
    { year: "2016", description: "Clinician-Scientist Transition Award, National Medical Research Council, Singapore" },
    { year: "2015", description: "NUHS Clinician-Scientist Program Award, National University Hospital, Singapore" },
    { year: "2014", description: "NRF Singapore nomination to attend the 64th Lindau Nobel meeting (Medicine and Physiology)" },
    { year: "2011", description: "Academic Development Award, National University Hospital, Singapore" },
    { year: "2009-2010", description: "Junior Research Fellowship, Wolfson College, Cambridge" },
    { year: "2005-2008", description: "Gates Cambridge Scholarship, Gates Cambridge Trust, University of Cambridge, UK" }
  ];

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#6b46c1",
      },
      links: {
        color: "#9f7aea",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 70,
      },
      opacity: {
        value: 0.25,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className={styles.container}>
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
          <NeonIsometricMaze />
        </div>
      </motion.div>
      <main className={styles.main}>
        <div className={styles.profile}>
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/media/ADJ-Profile2.png"
              alt="Anand Jeyasekharan"
              width={300}
              height={400}
              className={styles.profileImage}
              priority
            />
            
            <motion.div 
              className={styles.socialLinks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
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

          <motion.div
            className={styles.content}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              className={styles.name}
            >
              Anand JEYASEKHARAN
            </motion.h1>

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
                  className={styles.tabButton}
                  onClick={() => setActiveTab('affiliations')}
                  variants={tabVariants}
                  animate={activeTab === 'affiliations' ? 'active' : 'inactive'}
                >
                  <Building size={18} />
                  <span>Affiliations</span>
                </motion.div>
                <motion.div 
                  className={styles.tabButton}
                  onClick={() => setActiveTab('awards')}
                  variants={tabVariants}
                  animate={activeTab === 'awards' ? 'active' : 'inactive'}
                >
                  <Award size={18} />
                  <span>Honors & Awards</span>
                </motion.div>
              </div>
              
              <div className={styles.tabContent}>
                {activeTab === 'affiliations' && (
                  <motion.div 
                    className={styles.affiliationsList}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    <ul>
                      {affiliations.map((affiliation, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          {affiliation}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                {activeTab === 'awards' && (
                  <motion.div 
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <span className={styles.awardYear}>{award.year}</span>
                          <span className={styles.awardDescription}>{award.description}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}