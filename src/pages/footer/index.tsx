"use client"
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./Footer.module.css";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import React from "react";
import Image from "next/image";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };


  interface LogoUrls {
    nus: string;
    csi: string;
  }

  interface NavItem {
    name: string;
    path: string;
  }

  const handleLogoClick = (url: string): void => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const logoUrls: LogoUrls = {
    nus: "https://www.nus.edu.sg/",
    csi: "https://www.csi.nus.edu.sg/"
  };

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: "Anand", path: "/anand" },
    { name: "Lab Members", path: "/members" },
    { name: "Publications", path: "/publications" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className={styles.footer} ref={footerRef}>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <div className={styles.footerTop}>
          {/* Left section - Company Logos */}
          <motion.div
            className={styles.companyLogos}
            variants={fadeInUp}
          >
            <div className={styles.logoRow}>
              <motion.div
                className={styles.companyLogo}
                variants={fadeInUp}
                onClick={() => handleLogoClick(logoUrls.nus)}
                style={{ cursor: 'pointer' }}
              >
                <img src="/media/NUS-logo.png" alt="NUS" />
              </motion.div>
              <motion.div
                className={styles.companyLogo}
                variants={fadeInUp}
                onClick={() => handleLogoClick(logoUrls.csi)}
                style={{ cursor: 'pointer' }}
              >
                <img src="/media/CSI-logo.png" alt="CSI" />
              </motion.div>
            </div>
          </motion.div>

          {/* Middle section - Social Links */}
          <motion.div
            className={styles.socialLinks}
            variants={fadeInUp}
          >
            <motion.a
              href="https://github.com/shrutisridhar99"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              variants={fadeInUp}
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fcsi.nus.edu.sg%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Eadj_23&region=follow_link&screen_name=adj_23"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              variants={fadeInUp}
            >
              <FaTwitter size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/anand-jeyasekharan-920694141/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              variants={fadeInUp}
            >
              <FaLinkedin size={20} />
            </motion.a>
          </motion.div>
        
          {/* Right section - Lab Address */}
          <motion.div
            className={styles.addressSection}
            variants={fadeInUp}
          >
            <h4>Laboratory Address</h4>
            <p>Cancer Science Institute (CSI) Singapore</p>
            <p>14 Medical Dr,Centre for Translational Medicine (MD6)</p>
            <p>Singapore 117599</p>
          </motion.div>
        </div>

        <div className={styles.divider}></div>

        <motion.nav
          className={styles.nav}
          variants={fadeInUp}
        >
          {navItems.map((item, index) => (
            <React.Fragment key={`nav-item-${index}`}>
              <motion.a
                href={item.path}
                className={styles.navLink}
                whileHover={{ color: "#3b82f6" }}
              >
                {item.name}
              </motion.a>
              {index < navItems.length - 1 && <span className={styles.separator}>|</span>}
            </React.Fragment>
          ))}
        </motion.nav>

        <motion.div
          className={styles.copyright}
          variants={fadeInUp}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            © ADJ Lab. All rights reserved {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}