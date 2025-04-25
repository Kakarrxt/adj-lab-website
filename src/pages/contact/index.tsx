"use client"
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import styles from "./contact.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import AnimatedTitle from "@/components/AnimatedTitle";
import NUSMapbox from "./nusMap";
export default function ContactPage() {
  const title = "Contact Us";

  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 });
  const isContactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.3 });
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
              blend={0.6}
              amplitude={1.2}
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
              transition={{ delay: 1.2 }}
              className={styles.messageBox}
            >
              <h2>Get in <span className={styles.highlight}>Touch</span></h2>
              <p>
                Interested in <span className={styles.colorHighlight}>collaborating</span> or have <span className={styles.colorHighlight}>questions</span> about our research? 
                We&apos;d love to hear from you. Our team is dedicated to advancing cancer research 
                and fostering innovative partnerships.
              </p>
            </motion.div>

            <motion.section
              ref={contactInfoRef}
              initial="hidden"
              animate={isContactInfoInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className={styles.contactInfo}
            >
              <motion.div variants={scaleIn} className={styles.contactCard}>
                <div className={styles.iconWrapper}>
                  <FaPhone className={styles.icon} />
                </div>
                <h3>Phone</h3>
                <p>+65 6516 2162</p>
              </motion.div>

              <motion.div variants={scaleIn} className={styles.contactCard}>
                <div className={styles.iconWrapper}>
                  <FaEnvelope className={styles.icon} />
                </div>
                <h3>Email</h3>
                <div className={styles.emailContainer}>
                  <div className={styles.emailItem}>
                    <span className={styles.personName}>Anand Jeyasekharan (PI)</span>
                    <a href="mailto:csiadj(at)nus.edu.sg" className={styles.emailLink}>
                      csiadj(at)nus.edu.sg
                    </a>
                  </div>
                  <div className={styles.emailItem}>
                    <span className={styles.personName}>Chartsiam (Sam) Tipgomut</span>
                    <span className={styles.personRole}>Lab Manager</span>
                    <a href="mailto:c.tip(at)nus.edu.sg" className={styles.emailLink}>
                      c.tip(at)nus.edu.sg
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={scaleIn} className={styles.contactCard}>
                <div className={styles.iconWrapper}>
                  <FaMapMarkerAlt className={styles.icon} />
                </div>
                <h3>Address</h3>
                <p>Cancer Science Institute (CSI) Singapore</p>
                <p>14 Medical Dr, Centre for Translational Medicine (MD6)</p>
                <p>Singapore 117599</p>
              </motion.div>
            </motion.section>

            <motion.section
              ref={mapRef}
              initial="hidden"
              animate={isMapInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className={styles.contentSection}
            >
              <motion.div variants={fadeInRight} className={styles.mapContainer}>
                <h2>Find Us</h2>
                <div className={styles.mapWrapper}>
                  {/* <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7985025311636!2d103.78172909999999!3d1.2954827000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a51485a1695%3A0x5a1ae37f15111c63!2sCancer%20Science%20Institute%20(CSI)%20Singapore%20-%20NUS!5e0!3m2!1sen!2sin!4v1740492023597!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy"
                    title="Lab Location"
                  ></iframe> */}
                  <NUSMapbox/>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInLeft} className={styles.labImagesSection}>
                <h2>Our Lab</h2>
                <div className={styles.labImagesGrid}>
                  <motion.div 
                    className={styles.labImage}
                    whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                  >
                    <div className={styles.imageWrapper}>
                      <Image 
                        src="/media/contact/Lab-MD6.png" 
                        alt="Lab facility" 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className={styles.imageCaption}>Research Laboratory</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className={styles.labImage}
                    whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                  >
                    <div className={styles.imageWrapper}>
                      <Image 
                        src="/media/contact/Lab-interior.jpeg" 
                        alt="Lab facility" 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className={styles.imageCaption}>Equipment Room</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>

            <motion.section 
              className={styles.visitSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2>Working Hours</h2>
              <div className={styles.hoursContainer}>
                <div className={styles.hoursItem}>
                  <div className={styles.dayWrapper}>
                    <FaClock className={styles.timeIcon} />
                    <span className={styles.day}>Monday - Friday</span>
                  </div>
                  <span className={styles.time}>8:00 AM - 6:00 PM</span>
                </div>
                <div className={styles.hoursItem}>
                  <div className={styles.dayWrapper}>
                    <FaClock className={styles.timeIcon} />
                    <span className={styles.day}>Saturday & Sunday</span>
                  </div>
                  <span className={styles.time}>Closed</span>
                </div>
                <div className={styles.hoursItem}>
                  <div className={styles.dayWrapper}>
                    <FaClock className={styles.timeIcon} />
                    <span className={styles.day}>Public Holidays</span>
                  </div>
                  <span className={styles.time}>Closed</span>
                </div>
              </div>
            </motion.section>
          </main>
        </div>
    </>
  );
}