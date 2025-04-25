"use client"
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import styles from "./Anand.module.css";
import { Twitter, Linkedin, Mail, Award, Building, BookOpen, ChevronRight, Bookmark } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import Curve from '@/components/Curve/Curve';
import Aurora from "@/components/Aurora/Aurora";
import { primaryAffiliations, additionalPositions, awards } from "@/constants";

export default function AnandPage() {
  const title = "Anand Jeyasekharan";
  
  const [init, setInit] = useState(false);
  const [activeTab, setActiveTab] = useState('affiliations');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const profileRef = useRef(null);
  const descriptionRef = useRef(null);
  const isProfileInView = useInView(profileRef, { once: true });
  const isDescriptionInView = useInView(descriptionRef, { once: true });

  useEffect(() => {
    const img = new window.Image();
    img.src = "/media/anand/anand-profile.png";
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, 1000); 

    setTimeout(() => setIsLoaded(true), 300);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    };
    
    window.addEventListener("resize", debouncedResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);


  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60, // Reduced from 120
    particles: {
      color: {
        value: "#5a3da5", 
      },
      links: {
        color: "#8a6ad6", 
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1.2, 
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60, 
      },
      opacity: {
        value: 0.6,
        anim: {
          enable: true,
          speed: 0.3, 
          opacity_min: 0.15,
          sync: false
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 2, max: 5 }, // Reduced from 4.5
      },
    },
    interactivity: {
      modes: {
        repulse: {
          distance: 100, // Reduced from 120
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };


  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };


  const listItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut",
      }
    })
  };

  const textShimmer = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: [0, 0.5, 0.8, 0.5, 0],
      width: ["0%", "100%", "100%", "100%", "0%"],
      left: ["0%", "0%", "0%", "0%", "100%"],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4
      }
    }
  };
  
  const charAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.04,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  const principalInvestigatorAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    }
  };

  return (
    <>
      {!isMobile && <Curve backgroundColor="#f1f1f1">
        <div className={styles.backgroundGradient}></div>
      </Curve>}
      
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
          <Aurora
            colorStops={["#A855F7", "#9333EA", "#6B21A8"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
      </motion.div>

      <div className={styles.container}>
        <main className={styles.main}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5}}
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={principalInvestigatorAnimation}
              className={styles.roleTitle}
            >
              Principal Investigator
              <motion.span 
                className={styles.roleTitleShimmer}
                variants={textShimmer}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            ref={profileRef}
            className={styles.profile}
            initial="hidden"
            animate={isProfileInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.div
              className={styles.imageContainer}
              variants={fadeInUp}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src="/media/anand/anand-profile.png"
                  alt="Anand Jeyasekharan"
                  width={350}
                  height={470}
                  className={styles.profileImage}
                  priority={true}
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 350px"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtgJJi+SQHQAAAABJRU5ErkJggg=="
                />
                <div className={styles.imageOverlay}></div>
              </div>
              
              <motion.div className={styles.socialLinks}>
                <motion.a
                  href="mailto:csiadj(at)nus.edu.sg"
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
                <motion.a
                  href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=2nrv9VIAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, backgroundColor: "#6b46c1", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                  className={`${styles.socialLink} ${styles.scholarLink}`}
                  aria-label="Google Scholar"
                >
                  <Bookmark size={20} />
                  <span className={styles.scholarText}>Google Scholar</span>
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div className={styles.content}>
              <motion.div
                ref={descriptionRef}
                variants={fadeInUp}
                className={styles.description}
                initial="hidden"
                animate={isDescriptionInView ? "visible" : "hidden"}
              >
                <p>
                  Work in the <span className={styles.colorHighlight}>ADJ laboratory</span> focuses on how the <span className={styles.colorHighlight}>immune system recognizes cancer cells</span> upon treatment with DNA damaging chemotherapy.
                  Our eventual aim is to use this information to guide the <span className={styles.colorHighlight}>rational design of immunotherapy-chemotherapy combinations</span> for cancer treatment.
                </p>
                <p className={styles.descriptionEmphasis}>
                  Our research involves both <span className={styles.underlineAnimation}>fundamental research</span> (molecular and cellular biology of chemotherapy responses) and <span className={styles.underlineAnimation}>translational research</span>
                  (using clinical samples) in a variety of cancer types.
                </p>
                <p>
                  We have a specific interest in <span className={styles.colorHighlight}>lymphomas</span>; and work closely with colleagues in
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
      </div>
    </>
  );
}