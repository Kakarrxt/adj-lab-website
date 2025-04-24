"use client"
import { motion } from "framer-motion";
import styles from "./Research.module.css";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import AnimatedTitle from "@/components/AnimatedTitle";

export default function ResearchPage() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const sectionsRef = useRef(null);
  const projectTitleRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const isImageInView = useInView(imageRef, { once: true });
  const areSectionsInView = useInView(sectionsRef, { once: true, margin: "-100px 0px" });
  const isProjectTitleInView = useInView(projectTitleRef, { once: true });
  const [init, setInit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/media/research/image.png";
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
    fpsLimit: 60,
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
        value: { min: 2, max: 5 },
      },
    },
    interactivity: {
      modes: {
        repulse: {
          distance: 100,
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
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
          <div className={styles.heroSection}>
            <motion.div
              ref={imageRef}
              className={styles.heroImageWrapper}
              initial="hidden"
              animate={isImageInView ? "visible" : "hidden"}
              variants={scaleIn}
            >
              <motion.div 
                className={styles.centeredHeroImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/media/research/image.png"
                  alt="Lymphoma Research Visualization"
                  width={1200}
                  height={600}
                  className={styles.researchImage} 
                  priority
                />
              </motion.div>
              
              <motion.div 
                ref={textRef}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                className={styles.introTextContainer}
              >
                <p className={styles.intro}>
                  Optimising treatment strategies for <strong>aggressive lymphomas</strong> requires a precise understanding of tumour biology and its clinical implications. Our research focuses on identifying <strong>high-risk patients</strong> who may benefit from <strong>immunotherapeutic interventions</strong>, such as bispecific antibodies and CAR-T cell therapy, while improving diagnostic and therapeutic approaches for <strong>chemotherapy-resistant disease</strong>. A key priority is to <strong>bridge the gap</strong> between the growing array of therapeutic options and the need for <strong>clinically actionable strategies</strong> to guide treatment selection.
                </p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            ref={projectTitleRef}
            initial="hidden"
            animate={isProjectTitleInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className={styles.projectTitleContainer}
          >
            <AnimatedTitle title="Projects" />
          </motion.div>

          <motion.section
            ref={sectionsRef}
            initial="hidden"
            animate={areSectionsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className={styles.content}
          >
            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <div className={styles.themeLabel}>Theme 1</div>
              <h2>Personalised Medicine in Oncology</h2>
              <p>
                We are exploring <strong>innovative strategies</strong> to optimise drug combinations for patients with refractory lymphoma using the <strong>Quadratic Phenotypic Optimisation Platform (QPOP)</strong>. Our <strong>first-in-human trial</strong> (<span className={styles.publication}>Science Translational Medicine 2022</span>) demonstrated the clinical utility of QPOP in guiding personalized treatment approaches.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <div className={styles.themeLabel}>Theme 2</div>
              <h2>Quantitative Microscopy</h2>
              <p>
                Leveraging <strong>advanced spatial and molecular profiling</strong>, we have identified a subpopulation of tumor cells overexpressing <strong>MYC</strong> and <strong>BCL2</strong> while lacking <strong>BCL6</strong> (<span className={styles.highlight}>M+2+6−</span>) in diffuse large B-cell lymphoma (DLBCL) as a <strong>predictor of chemotherapy failure</strong>, leading to the development of an immunohistochemistry-based assay for treatment stratification. Our findings (<span className={styles.publication}>Cancer Discovery 2023</span>), provide a foundation for exploring the relevance of oncogene co-expression at the single-cell level in other cancers.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <div className={styles.themeLabel}>Theme 3</div>
              <h2>Immune Features of Chemoresistance</h2>
              <p>
                In advancing immune microenvironment research, our team characterised infiltrating macrophages in DLBCL using <strong>NanoString Digital Spatial Profiling (DSP)</strong> and identified clinically relevant macrophage subtypes with prognostic significance (<span className={styles.publication}>Nature Communications 2024</span>). 
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className={styles.researchSection}>
              <div className={styles.themeLabel}>Theme 4</div>
              <h2>Immune Signaling after Genotoxic Stress</h2>
              <p>
                We elucidated mechanisms of immune regulation in lymphoma, demonstrating that the <strong>PRMT5-ZNF326 axis</strong> serves as a key mediator of innate immune activation in response to chemotherapy-induced replication stress (<span className={styles.publication}>Science Advances 2024</span>). These findings have <strong>important implications</strong> for the development of novel immunotherapy combinations.
              </p>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </>
  );
}