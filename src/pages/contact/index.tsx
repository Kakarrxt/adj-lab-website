"use client"
import { motion } from "framer-motion";
import { useRef, useEffect,useState} from "react";
import { useInView } from "framer-motion";
import styles from "./contact.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
export default function ContactPage() {



  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  const isMapInView = useInView(mapRef, { once: true });
  const isContactInfoInView = useInView(contactInfoRef, { once: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    
    // Set page as loaded after a slight delay for animations
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

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

  return (
    <>
    <Curve backgroundColor="#f1f1f1">
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

      <div className={styles.container}>
        <main className={styles.main}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.header}
          >
            <h1>Contact Us</h1>
            <div className={styles.underline} />
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
              <a href="mailto:csiadj@nus.edu.sg" className={styles.emailLink}>
                csiadj@nus.edu.sg
              </a>
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

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={styles.messageBox}
          >
            <h2>Get in Touch</h2>
            <p>Interested in collaborating or have questions about our research? We&apos;d love to hear from you.</p>
          </motion.div>

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
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7985025311636!2d103.78172909999999!3d1.2954827000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a51485a1695%3A0x5a1ae37f15111c63!2sCancer%20Science%20Institute%20(CSI)%20Singapore%20-%20NUS!5e0!3m2!1sen!2sin!4v1740492023597!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  title="Lab Location"
                ></iframe>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInLeft} className={styles.labImagesSection}>
              <h2>Our Lab</h2>
              <div className={styles.labImagesContainer}>
                <motion.div 
                  className={styles.labImage}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <div className={styles.imageWrapper}>
                    <Image 
                      src="/media/Lab-MD6.png" 
                      alt="Lab facility" 
                      fill
                      objectFit="cover"
                    />
                    <div className={styles.imageCaption}>Research Laboratory</div>
                  </div>
                </motion.div>
                <motion.div 
                  className={styles.labImage}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <div className={styles.imageWrapper}>
                    <Image 
                      src="/media/Lab-interior.jpeg" 
                      alt="Lab facility" 
                      fill
                      objectFit="cover"
                    />
                    <div className={styles.imageCaption}>Equipment Room</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

        {/*Optional section for visiting hours*/}
          <motion.section 
            className={styles.visitSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>Visiting Hours</h2>
            <div className={styles.hoursContainer}>
              <div className={styles.hoursItem}>
                <span className={styles.day}>Monday - Friday</span>
                <span className={styles.time}>9:00 AM - 5:00 PM</span>
              </div>
              <div className={styles.hoursItem}>
                <span className={styles.day}>Saturday</span>
                <span className={styles.time}>?</span>
              </div>
              <div className={styles.hoursItem}>
                <span className={styles.day}>Sunday & Public Holidays</span>
                <span className={styles.time}>Closed</span>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
      </Curve>
    </>
  );
}