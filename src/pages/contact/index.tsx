"use client"
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./contact.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import NeonIsometricMaze from "@/components/NeonIsometricMaze";
import Curve from '@/components/Curve/Curve'

export default function ContactPage() {
  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  const isMapInView = useInView(mapRef, { once: true });
  const isContactInfoInView = useInView(contactInfoRef, { once: true });

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
    <Curve backgroundColor="#f1f1f1">
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