"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import styles from "./members.module.css"
import Link from "next/link"
import NeonIsometricMaze from "@/components/NeonIsometricMaze"
import TiltedCard from "./TiltedCard"
import Curve from '@/components/Curve/Curve'

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
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const currentMembers = [
    {
      name: "Norbert Tay Sheng Cong",
      title: "Research Fellow",
      image: "/media/LabMembers/Chow-Norbert-Tay-.jpg",
      description:
        "Investigating Molecular Mechanism of DNA Damage Response-based Therapies in Haematological Malignancies.",
      bio: "Investigating Molecular Mechanism of DNA Damage Response-based Therapies in Haematological Malignancies.",
      email: "Email",
    },
    {
      name: "Clarissa Toh Chin Min",
      title: "Research Fellow",
      image: "/media/LabMembers/Clarissa-Toh.jpeg",
      description: "Investigating the role of novel proteins in replication stress-induced inflammatory signalling.",
      bio: "Investigating the role of novel proteins in replication stress-induced inflammatory signalling.",
      email: "Email",
    },
    {
      name: "Allison Chan",
      title: "Research Fellow",
      image: "/media/LabMembers/Allison.jpg",
      description: "Investigating immune activation after DNA damage in B cell lymphoma.",
      bio: "Investigating immune activation after DNA damage in B cell lymphoma.",
      email: "Email",
    },
    {
      name: "Akshaya Anbuselvan",
      title: "Research Assistant",
      image: "/media/LabMembers/Akshaya.jpg",
      description: "Study of immune activation after DNA damage in Diffuse large B cell lymphoma.",
      bio: "Study of immune activation after DNA damage in Diffuse large B cell lymphoma.",
      email: "Email",
    },
    {
      name: "Phuong Mai Hoang",
      title: "Research Fellow",
      image: "/media/LabMembers/Phoung.jpg",
      description: "Investigating immune activation in response to replication stress.",
      bio: "Investigating immune activation in response to replication stress.",
      email: "Email",
    },
    {
      name: "Charmaine Ong Zi Yan",
      title: "PhD Student",
      image: "/media/LabMembers/Charmaine-Ong.jpg",
      description: "Determinants of chemosensitivity in aggressive B-cell lymphomas.",
      bio: "Determinants of chemosensitivity in aggressive B-cell lymphomas.",
      email: "Email",
    },
    {
      name: "Shruti Sridhar",
      title: "PhD Student",
      image: "/media/LabMembers/Shruti.png",
      description:
        "Investigating cellular and spatial patterns of prognostically relevant oncogene co-expression in DLBCL.",
      bio: "Investigating cellular and spatial patterns of prognostically relevant oncogene co-expression in DLBCL.",
      email: "Email",
    },
    {
      name: "Hong Liang",
      title: "Research Assistant/PhD Student",
      image: "/media/LabMembers/Hong.png",
      description: "Study of transcriptomics like RNA sequencing analysis using bioinformatics techniques.",
      bio: "Study of transcriptomics like RNA sequencing analysis using bioinformatics techniques.",
      email: "Email",
    },
    {
      name: "Chartsiam (Sam) Tipgomut",
      title: "Scientific Officer",
      image: "/media/LabMembers/sam-Chartsiam.jpg",
      description:
        "Development of human cellular model systems for in-depth analysis and drug screening of a novel Diamond-Blackfan anemia mutation.",
      bio: "Development of human cellular model systems for in-depth analysis and drug screening of a novel Diamond-Blackfan anemia mutation.",
      email: "Email",
    },
    {
      name: "Lee Rui Xue",
      title: "PhD Student",
      image: "/media/LabMembers/Lee-Rui-Xue.jpg",
      description: "Identifying novel drug combinations that augment the efficacy of immunomodulators in DLBCL.",
      bio: "Identifying novel drug combinations that augment the efficacy of immunomodulators in DLBCL.",
      email: "Email",
    },
    {
      name: "Girija Shenoy",
      title: "Research Assistant",
      image: "/media/LabMembers/Girija.png",
      description: "RNAseq and single-cell RNA sequencing data analysis using bioinformatics techniques.",
      bio: "RNAseq and single-cell RNA sequencing data analysis using bioinformatics techniques.",
      email: "Email",
    },
    {
      name: "Irene Biju",
      title: "Undergraduate-Master Student",
      image: "/media/LabMembers/Irene.jpg", // Add proper image path
      description: "",
      bio: "",
      email: "Email",
    },
  ]

  const alumniMembers = [
    {
      name: "Justin Chan",
      title: "Former Research Assistant",
      image: "/media/LabMembers/Justin.jpg", // Add proper image path
      period: "2020-2023",
    },
    {
      name: "Bryce Tan Wei Quan",
      title: "Former PhD Student",
      image: "/media/LabMembers/Bryce-Tan.jpeg",
      period: "2019-2024",
    },
    {
      name: "Michal Marek Hoppe",
      title: "Former Research Fellow",
      image: "/media/LabMembers/Michal.jpg", // Add proper image path
      period: "2018-2022",
    },
    {
      name: "Patrick William Jaynes",
      title: "Former Research Fellow",
      image: "/media/LabMembers/Patrick.jpg",
      period: "2020-2024",
    },
    {
      name: "Liu Min",
      title: "Former Research Assistant",
      image: "/media/LabMembers/Liu-Min.jpg", // Add proper image path
      period: "2019-2022",
    },
    {
      name: "Kanav Kupta",
      title: "Former Research Intern",
      image: "/media/LabMembers/Kanav.jpg", // Add proper image path
      period: "May 2024 - Nov 2024",
    },
    {
      name: "Wang Rui",
      title: "Former Research Assistant",
      image: "/media/LabMembers/Wang-Rui.jpg", // Add proper image path
      period: "2019-2021",
    },
  ]

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#6b46c1",
      },
      links: {
        color: "#9f7aea",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 70,
      },
      opacity: {
        value: 0.25,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },
    detectRetina: true,
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
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className={styles.particles}
        />
      )}
        <main className={styles.main}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.hero}
          >
            <h1>Lab Members</h1>
            <p>Meet the brilliant minds behind our groundbreaking research</p>
          </motion.div>

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
      </Curve>
    </>
  )
}

interface Member {
  name: string
  title: string
  image: string
  description: string
  bio: string
  email: string
}

interface Alumni {
  name: string
  title: string
  image: string
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
            containerHeight=""
            containerWidth=""
            imageHeight="180px"
            imageWidth="180px"
            borderRadius='50%'
            scaleOnHover={1.05}
            rotateAmplitude={3}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
        <Link href={`mailto:${member.email}`} className={styles.emailLink}>
          <span className={styles.emailIcon}>✉️</span> Contact
        </Link>
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
    <motion.div variants={itemVariants} className={styles.alumniCard}>
      <div className={styles.alumniPhoto}>
        <TiltedCard
          imageSrc={alumni.image}
          altText={alumni.name}
          containerHeight=""
          containerWidth=""
          imageHeight="150px"
          imageWidth="150px"
          borderRadius='50%'
          scaleOnHover={1.05}
          rotateAmplitude={3}
          showMobileWarning={false}
          showTooltip={false}
        />
      </div>
      <div className={styles.alumniInfo}>
        <h3 className={styles.alumniName}>{alumni.name}</h3>
        <p className={styles.alumniTitle}>{alumni.title}</p>
        <p className={styles.alumniPeriod}>{alumni.period}</p>
      </div>
    </motion.div>
  )
}