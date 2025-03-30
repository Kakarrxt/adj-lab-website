"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import styles from "./members.module.css"
import TiltedCard from "./TiltedCard"
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
import { currentMembers, alumniMembers } from "@/constants";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import AnimatedTitle from "@/components/AnimatedTitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}


export default function LabMembers() {

  const title = "Lab Members";
  const [isMobile, setIsMobile] = useState(false);
  const [init, setInit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
        <div className={styles.auroraContainer}>
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

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Current Lab Members</h2>
            <motion.div className={styles.membersGrid} variants={containerVariants} initial="hidden" animate="visible">
              {currentMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </motion.div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Alumni</h2>
            <motion.div className={styles.alumniGrid} variants={containerVariants} initial="hidden" animate="visible">
              {alumniMembers.map((alumni, index) => (
                <AlumniCard key={index} alumni={alumni} />
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </>
  )
}

interface Member {
  name: string
  title: string
  image: string
  description: string
  bio: string
}

interface Alumni {
  name: string
  title: string
  image?: string
  period: string
}

function MemberCard({ member }: { member: Member }) {
  return (
    <motion.div variants={itemVariants} className={styles.memberCard}>
      <div className={styles.photoSection}>
        <div className={styles.imageWrapper}>
          <TiltedCard
            imageSrc={member.image}
            altText={member.name}
            containerHeight="240px"
            containerWidth="240px"
            imageHeight="240px"
            imageWidth="240px"
            borderRadius='50%'
            scaleOnHover={1.05}
            rotateAmplitude={5}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
      </div>

      <div className={styles.infoSection}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberTitle}>{member.title}</p>
        <p className={styles.memberDescription}>{member.description}</p>
      </div>

      <div className={styles.bioSection}>
        <h4 className={styles.bioTitle}>Biography</h4>
        <p className={styles.memberBio}>{member.bio}</p>
      </div>
    </motion.div>
  )
}

function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <motion.div variants={itemVariants} className={styles.alumniCardWrapper}>
      <SpotlightCard 
        className={`custom-spotlight-card ${styles.spotlightWrapper}`}
        spotlightColor="rgba(123, 31, 162, 0.15)"
      >
        <div className={styles.alumniCard}>
          <div className={styles.alumniInfo}>
            <h3 className={styles.alumniName}>{alumni.name}</h3>
            <p className={styles.alumniTitle}>{alumni.title}</p>
            <p className={styles.alumniPeriod}>{alumni.period}</p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}