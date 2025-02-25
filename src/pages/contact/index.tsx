// Components/Contact/index.tsx
"use client"
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./contact.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
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
          <motion.div variants={fadeInUp} className={styles.contactCard}>
            <FaPhone className={styles.icon} />
            <h3>Phone</h3>
            <p>++65 6516 2162</p>
          </motion.div>

          <motion.div variants={fadeInUp} className={styles.contactCard}>
            <FaEnvelope className={styles.icon} />
            <h3>Email</h3>
            <a href="mailto:csiadj@nus.edu.sg" className={styles.emailLink}>
            csiadj@nus.edu.sg
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className={styles.contactCard}>
            <FaMapMarkerAlt className={styles.icon} />
            <h3>Address</h3>
            <p>Cancer Science Institute (CSI) Singapore</p>
            <p>14 Medical Dr,Centre for Translational Medicine (MD6)</p>
            <p>Singapore 117599</p>
          </motion.div>
        </motion.section>

        <motion.section
          ref={mapRef}
          initial="hidden"
          animate={isMapInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className={styles.mapSection}
        >
          <motion.div 
            variants={fadeInUp} 
            className={styles.mapContainer}
          >
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7985025311636!2d103.78172909999999!3d1.2954827000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a51485a1695%3A0x5a1ae37f15111c63!2sCancer%20Science%20Institute%20(CSI)%20Singapore%20-%20NUS!5e0!3m2!1sen!2sin!4v1740492023597!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
              title="Lab Location"
            ></iframe>
          </motion.div>
          
          <motion.div variants={fadeInUp} className={styles.labImagesContainer}>
            <motion.div 
              className={styles.labImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image src="/media/lab-1.png" alt="Lab facility" />
            </motion.div>
            <motion.div 
              className={styles.labImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Image src="/media/lab-1.png" alt="Lab facility" />
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}