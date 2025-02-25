"use client"
import { motion } from "framer-motion"
import styles from "./members.module.css"
import Link from "next/link"
import Image from "next/image"
import NeonIsometricMaze from "@/components/NeonIsometricMaze"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function LabMembers() {
  const PI = {
    name: "Dr. Anand Jeyashekharan",
    title: "Principal Investigator",
    image: "/media/LabMembers/Anand.jpeg",
    description: "The ADJ laboratory investigates immune recognition of cancer after chemotherapy to develop effective immunotherapy-chemotherapy combinations. We conduct both molecular research and clinical studies, with special focus on lymphomas in collaboration with the NUH Lymphoma team.",
    bio: "Clinician-scientist and Assistant Professor at NUS Centre for Cancer Research. Medical Oncologist at National University Cancer Institute and Principal Investigator at Cancer Science Institute. Leads Microscopy Core and co-leads Translational Research platform for Singapore Translational Cancer Consortium.",
    email: "csiadj@nus.edu.sg"
   }

  const currentMembers = [
    {
      name: "Patrick William Jaynes",
      title: "Research Fellow",
      image: "/media/LabMembers/Patrick.jpg",
      description: "Developing ways to augment the efficacy of chemotherapy within the context of lymphoma through the activation of the immune system.",
      bio: "Developing ways to augment the efficacy of chemotherapy within the context of lymphoma through the activation of the immune system.",
      email: "Email"
    },
    {
      name: "Norbert Tay Sheng Cong",
      title: "PhD Student",
      image: "/media/LabMembers/Chow-Norbert-Tay-.jpg",
      description: "Investigating Molecular Mechanism of DNA Damage Response-based Therapies in Haematological Malignancies.",
      bio: "Investigating Molecular Mechanism of DNA Damage Response-based Therapies in Haematological Malignancies.",
      email: "Email"
    },
    {
      name: "Clarissa Toh Chin Min",
      title: "Research Fellow",
      image: "/media/LabMembers/Clarissa-Toh.jpeg",
      description: "Investigating the role of novel proteins in replication stress-induced inflammatory signalling.",
      bio: "Investigating the role of novel proteins in replication stress-induced inflammatory signalling.",
      email: "Email"
    },
    {
      name: "Allison Chan",
      title: "Research Fellow",
      image: "/media/LabMembers/Allison.jpg",
      description: "Investigating immune activation after DNA damage in B cell lymphoma.",
      bio: "Investigating immune activation after DNA damage in B cell lymphoma.",
      email: "Email"
    },
    {
      name: "Akshaya Anbuselvan",
      title: "Research Assistant",
      image: "/media/LabMembers/Akshaya.jpg",
      description: "Study of immune activation after DNA damage in Diffuse large B cell lymphoma.",
      bio: "Study of immune activation after DNA damage in Diffuse large B cell lymphoma.",
      email: "Email"
    },
    {
      name: "Bryce Tan Wei Quan",
      title: "PhD Student",
      image: "/media/LabMembers/Bryce-Tan.jpeg",
      description: "Studying the role of mTOR in cellular survival and proliferation.",
      bio: "Studying the role of mTOR in cellular survival and proliferation.",
      email: "Email"
    },
    {
      name: "Phuong Mai Hoang",
      title: "Research Fellow",
      image: "/media/LabMembers/Phoung.jpg",
      description: "Investigating immune activation in response to replication stress.",
      bio: "Investigating immune activation in response to replication stress.",
      email: "Email"
    },
    {
      name: "Ong Zi Yan Charmaine",
      title: "PhD Student",
      image: "/media/LabMembers/Charmaine-Ong.jpg",
      description: "Determinants of chemosensitivity in aggressive B-cell lymphomas.",
      bio: "Determinants of chemosensitivity in aggressive B-cell lymphomas.",
      email: "Email"
    },
    {
      name: "Shruti Sridhar",
      title: "PhD Student",
      image: "/media/LabMembers/Shruti.png",
      description: "Investigating cellular and spatial patterns of prognostically relevant oncogene co-expression in DLBCL.",
      bio: "Investigating cellular and spatial patterns of prognostically relevant oncogene co-expression in DLBCL.",
      email: "Email"
    },
    {
      name: "Zuo Suhui",
      title: "Research Assistant",
      image: "/media/LabMembers/ZUO.png",
      description: "",
      bio: "",
      email: "Email"
    },
    {
      name: "Hong Liang",
      title: "Research Assistant",
      image: "/media/LabMembers/Hong.png",
      description: "Study of transcriptomics like RNA sequencing analysis using bioinformatics techniques.",
      bio: "Study of transcriptomics like RNA sequencing analysis using bioinformatics techniques.",
      email: "Email"
    },
    {
      name: "Chartsiam (Sam) Tipgomut",
      title: "Research Fellow",
      image: "/media/LabMembers/sam-Chartsiam.jpg",
      description: "Development of human cellular model systems for in-depth analysis and drug screening of a novel Diamond-Blackfan anemia mutation.",
      bio: "Development of human cellular model systems for in-depth analysis and drug screening of a novel Diamond-Blackfan anemia mutation.",
      email: "Email"
    },
    {
      name: "Lee Rui Xue",
      title: "PhD Student",
      image: "/media/LabMembers/Lee-Rui-Xue.jpg",
      description: "Identifying novel drug combinations that augment the efficacy of immunomodulators in DLBCL.",
      bio: "Identifying novel drug combinations that augment the efficacy of immunomodulators in DLBCL.",
      email: "Email"
    },
    {
      name: "Girija Shenoy",
      title: "Research Assistant",
      image: "/media/LabMembers/Girija.png",
      description: "RNAseq and single-cell RNA sequencing data analysis using bioinformatics techniques.",
      bio: "RNAseq and single-cell RNA sequencing data analysis using bioinformatics techniques.",
      email: "Email"
    },
    {
      name: "Tang Jing Ping",
      title: "Senior Laboratory Executive",
      image: "/media/LabMembers/tang_jing_ping.jpg",
      description: "Lab management and work on crystallography and SALL4 drug screening project.",
      bio: "Lab management and work on crystallography and SALL4 drug screening project.",
      email: "Email"
    },
  ]

  return (
    <><motion.div
      className={styles.sectionTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <NeonIsometricMaze />
      </div>

    </motion.div>
    
    <div className={styles.container}>
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
            <h2 className={styles.sectionTitle}>Principal Investigator</h2>
            <MemberCard member={PI} />
          </section>

      {/* Add section for lab outing and more images here */}
      {/* FUN STUFF*/}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Current Lab Members</h2>
            <motion.div
              className={styles.membersGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </motion.div>
          </section>
        </main>
      </div></>
  )
}

interface Member {
  name: string;
  title: string;
  image: string;
  description: string;
  bio: string;
  email: string;
}

function MemberCard({ member }: { member: Member }) {
  return (
    <motion.div
      variants={itemVariants}
      className={styles.memberCard}
    >
      <div className={styles.photoSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={member.image}
            alt={member.name}
            width={180}
            height={180}
            className={styles.memberImage}
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