"use client"
import { motion } from "framer-motion";
import { useRef,useEffect, useState} from "react";
import { useInView } from "framer-motion";
import styles from "./join-us.module.css";
import { FaUsers, FaCodeBranch, FaFlask, FaGraduationCap } from "react-icons/fa";
import Image from "next/image";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import AnimatedTitle from "@/components/AnimatedTitle";
import {openPositions} from "@/constants"


export default function JoinUsPage() {
  const title = "Join Our Team";

  const positionsRef = useRef<HTMLDivElement>(null);
  const careerInfoRef = useRef<HTMLDivElement>(null);
  const isPositionsInView = useInView(positionsRef, { once: true });
  const isCareerInfoInView = useInView(careerInfoRef, { once: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
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

        <AnimatedTitle title={title} />

        <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
        className={styles.messageBox}
          >
        <h2>Are you passionate about <span className={styles.highlight}>translational cancer research</span>?</h2>
        <p>
          We are always excited to welcome <span className={styles.colorHighlight}>enthusiastic and driven individuals</span> to our team! 
          Whether you are an overseas student, an NUH resident, or a medical student eager 
          to explore the frontiers of cancer biology, we offer a <span className={styles.colorHighlight}>collaborative and dynamic 
          environment</span> to grow your research skills.
        </p>
        </motion.div>

        <motion.section
        ref={careerInfoRef}
        initial="hidden"
        animate={isCareerInfoInView ? "visible" : "hidden"}
        variants={staggerChildren}
        transition={{ delay: 2.2 }}
        className={styles.careerInfo}
          >
        <motion.div variants={scaleIn} className={styles.careerCard}>
          <div className={styles.iconWrapper}>
            <FaUsers className={styles.icon} />
          </div>
          <h3>Collaborative Team</h3>
          <p>Join our diverse team of researchers working at the <span className={styles.colorHighlight}>intersection of cutting-edge science and clinical impact</span>.</p>
        </motion.div>

        <motion.div variants={scaleIn} className={styles.careerCard}>
          <div className={styles.iconWrapper}>
            <FaCodeBranch className={styles.icon} />
          </div>
          <h3>Technical Skills</h3>
          <p>We value experience in <span className={styles.colorHighlight}>coding</span> or proficiency in image analysis tools such as <span className={styles.colorHighlight}>QuPath</span>.</p>
        </motion.div>

        <motion.div variants={scaleIn} className={styles.careerCard}>
          <div className={styles.iconWrapper}>
            <FaFlask className={styles.icon} />
          </div>
          <h3>Research Opportunity</h3>
          <p>Gain valuable exposure to <span className={styles.colorHighlight}>translational oncology research</span> in a supportive environment.</p>
        </motion.div>
        </motion.section>

        <motion.section 
          className={styles.applySection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2>How to Apply</h2>
          <div className={styles.applyContent}>
            <div className={styles.applyCategory}>
              <h3>Undergraduate Students</h3>
              <p>
                To apply, please send your CV to <strong>Sam Tipgomut</strong> (<a href="mailto:c.tip(at)nus.edu.sg" className={styles.underlineAnimation}>c.tip(at)nus.edu.sg</a>).
              </p>
              <div className={styles.importantNote}>
                <p>
                  <strong>Important:</strong> Applications must be submitted at least <strong>6 months</strong> before your intended start date to accommodate the student pass process.
                </p>
              </div>
            </div>

            <div className={styles.applyCategory}>
              <h3>PhD Applicants</h3>
              <p>
                PhD candidates should apply directly through the <a href="https://csi.nus.edu.sg/" className={styles.underlineAnimation}>CSI Singapore website</a>. Please review the admission requirements and application deadlines before submitting your application.
              </p>
            </div>

            <div className={styles.applyCategory}>
              <h3>Postdoctoral Researchers & Others</h3>
              <p>
                For postdoctoral and other research positions, please check our <a href="#positions" className={styles.underlineAnimation} onClick={(e) => {
                e.preventDefault();
                const offset = 100;
                if (positionsRef.current) {
                  const targetPosition = positionsRef.current.offsetTop - offset;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                }
              }}>Opening Positions</a> section for current opportunities.
              </p>
            </div>
            
            <p className={styles.highlightText}>
              We look forward to hearing from you and advancing cancer research together!
            </p>
          </div>
        </motion.section>

        <motion.section
        id="positions"
        ref={positionsRef}
        initial="hidden"
        animate={isPositionsInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className={styles.contentSection}
      >
        <motion.div variants={fadeInRight} className={styles.positionsContainer}>
          <h2>Opening Positions</h2>
          
          {openPositions.map((position, index) => (
            <motion.div 
              key={index}
              className={styles.positionCard}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <h3>{position.heading}</h3>
              <div className={styles.positionDetails}>
                <p>{position.body}</p>
                <a href={position.link} className={styles.applyButton}>
                  View Position
                </a>
              </div>
            </motion.div>
          ))}
          
          {/* Show message if no positions are available */}
          {openPositions.length === 0 && (
            <div className={styles.noPositions}>
              <p>There are currently no open positions. Please check back later or contact us directly.</p>
            </div>
          )}
        </motion.div>
        
        <motion.div variants={fadeInRight} className={styles.labImageSection}>
          <h2>Research Environment</h2>
          <motion.div 
            className={styles.featureImage}
            whileHover={{ 
          scale: 1.02, 
          transition: { duration: 0.3 },
            }}
          >
            <div className={styles.featureImageWrapper}>
          <Image 
            src="/media/contact/Lab-MD6.png" 
            alt="Research environment" 
            fill
            objectFit="cover"
          />
          <div className={styles.imageCaption}>Cancer Science Institute (CSI) Singapore</div>
            </div>
          </motion.div>
        </motion.div>
        </motion.section>

        <motion.section
        className={styles.skillsSection}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
        <h2>Valued Skills & Experience</h2>
        <div className={styles.skillsGrid}>
          <motion.div 
            className={styles.skillCard}
            whileHover={{ scale: 1, backgroundColor: "rgba(107, 70, 193, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <FaGraduationCap className={styles.skillIcon} />
            <span><strong>Image Analysis</strong></span>
          </motion.div>
          <motion.div 
            className={styles.skillCard}
            whileHover={{ scale: 1, backgroundColor: "rgba(107, 70, 193, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <FaCodeBranch className={styles.skillIcon} />
            <span><strong>Coding Experience</strong></span>
          </motion.div>
          <motion.div 
            className={styles.skillCard}
            whileHover={{ scale: 1, backgroundColor: "rgba(107, 70, 193, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <FaFlask className={styles.skillIcon} />
            <span><strong>Laboratory Techniques</strong></span>
          </motion.div>
          <motion.div 
            className={styles.skillCard}
            whileHover={{ scale: 1, backgroundColor: "rgba(107, 70, 193, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <FaUsers className={styles.skillIcon} />
            <span><strong>Team Collaboration</strong></span>
          </motion.div>
        </div>
        </motion.section>
      </main>
      </div>
    </>
  );
}