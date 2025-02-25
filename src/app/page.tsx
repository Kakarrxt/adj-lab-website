"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/pages/navbar/index";
import Footer from "@/pages/footer/index";
import styles from "./page.module.css";
import anime from "animejs";
import NeonIsometricMaze from "@/components/NeonIsometricMaze";

export default function Main() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const nauticalMapRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Enable scrolling
    document.body.style.overflow = "auto";
    
    // Define focal point (adjust for mobile)
    const focalPointMap = isMobile ? { x: "50%", y: "50%" } : { x: "90%", y: "90%" };
    const focalPointcells = isMobile ? { x: "50%", y: "50%" } : { x: "90%", y: "90%" };

    if (nauticalMapRef.current) {
      nauticalMapRef.current.style.transformOrigin = `${focalPointMap.x} ${focalPointMap.y}`;
    }
    if (cellsRef.current) {
      cellsRef.current.style.transformOrigin = `${focalPointcells.x} ${focalPointcells.y}`;
    }
    
    // Animation timeline - adjust durations for mobile
    const animationSpeed = isMobile ? 0.8 : 1; // Slightly faster animations on mobile
    
    const timeline = anime.timeline({
      easing: "easeInOutQuad"
    });
    
    // Adjust scale for mobile devices
    const scaleAmount = isMobile ? 1.5 : 2;
    
    // Step 1: Zoom into nautical map
    timeline.add({
      targets: "#nautical-map",
      scale: [1, scaleAmount],
      duration: 2000 * animationSpeed,
      easing: "easeInOutCubic"
    })
    // Step 2: Fade in cells with slight overlap for seamless transition
    .add({
      targets: "#cells",
      opacity: [0, 1],
      duration: 800 * animationSpeed,
      offset: "-=300" // Start before previous animation ends
    }, "+=100")
    // Step 3: Zoom out cells
    .add({
      targets: "#cells",
      scale: [scaleAmount, 1],
      duration: 1500 * animationSpeed,
      easing: "easeOutQuad"
    }, "-=600")
    // Step 4: Fade out nautical map as cells become prominent
    .add({
      targets: "#nautical-map",
      opacity: [1, 0],
      duration: 600 * animationSpeed
    }, "-=1200")
    // Step 5: Fade in welcome text
    .add({
      targets: "#welcome-text",
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 800 * animationSpeed,
      complete: () => {
        setAnimationComplete(true);
        // Delay showing content for smooth transition
        setTimeout(() => setShowContent(true), 600 * animationSpeed);
      }
    });

    return () => {
      // Cleanup
      document.body.style.overflow = "auto";
      timeline.pause();
    };
  }, [isMobile]); // Re-run when isMobile changes

  return (
    <div className={styles.container}>
      {!showContent ? (
        <div className={styles.animationContainer}>
          {/* First Image - Nautical Map */}
          <div 
            id="nautical-map" 
            ref={nauticalMapRef}
            className={styles.imageContainer}
          >
            <Image 
              src="/media/Nautical.png" 
              alt="Nautical Map" 
              layout="fill" 
              objectFit="cover" 
              priority
              sizes="100vw" // Responsive image sizing
            />
          </div>
          
          {/* Second Image - Cancer Cells */}
          <div 
            id="cells" 
            ref={cellsRef}
            className={styles.imageContainer} 
            style={{ opacity: 0 }}
          >
            <Image 
              src="/media/cells.jpg" 
              alt="Cancer Cells" 
              layout="fill" 
              objectFit="cover" 
              priority
              sizes="100vw" // Responsive image sizing
            />
          </div>
          
          {/* Welcome Text Fade In */}
          <div id="welcome-text" className={styles.welcomeText} style={{ opacity: 0 }}>
            <h1>Welcome to ADJ Lab</h1>
          </div>
          
          {animationComplete && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={styles.navbarWrapper}
            >
              <Navbar />
            </motion.div>
          )}
        </div>
      ) : (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.mainContentWrapper}
          >
            <Navbar />
            
            <motion.div className={styles.sectionTop}>
              <div className="fixed inset-0 -z-10">
                <NeonIsometricMaze />
              </div>
            </motion.div>
            
            {/* Second Section - Welcome Text */}
            <motion.div 
              className={styles.section}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className={styles.hero}>
                <h1 className="text-white">Welcome to ADJ Lab</h1>
                <p className="text-gray-300">Advancing Cancer Research Through Innovation</p>
              </div>
              
              <motion.div 
                className={styles.content}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <div className={styles.contentSection}>
                  <h2>Our Mission</h2>
                  <p>
                    Dedicated to understanding and developing innovative approaches in cancer treatment through cutting-edge research and collaboration.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Footer with animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Footer />
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}