"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/pages/navbar";
import Footer from "@/pages/footer";
import styles from "./page.module.css";

// Interfaces for type safety
interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link?: string;
}

export default function ResearchPage() {
  const [animationStage, setAnimationStage] = useState<'initial' | 'map-zoom' | 'cells-zoom' | 'cells-out'>('initial');
  const [selectedResearch, setSelectedResearch] = useState<ResearchTopic | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // Refs for intersection observer
  const researchRef = useRef(null);
  const newsRef = useRef(null);
  const isResearchInView = useInView(researchRef, { once: true });
  const isNewsInView = useInView(newsRef, { once: true });
  

  // Research Topics with more detailed information
  const researchTopics: ResearchTopic[] = [
    {
      id: "molecular-mapping",
      title: "Molecular Mapping",
      description: "Advanced cancer progression analysis",
      fullDescription: "Pioneering research into molecular-level cancer progression mapping, utilizing cutting-edge genomic and proteomic techniques to understand cellular transformations.",
      image: "/media/molecular-mapping.jpg",
      tags: ["Genomics", "Cancer Research", "Molecular Biology"]
    },
    {
      id: "cellular-intervention",
      title: "Cellular Intervention",
      description: "Targeted cellular therapeutic strategies",
      fullDescription: "Developing innovative cellular intervention techniques to disrupt cancer cell growth, focusing on precision medicine and targeted therapeutic approaches.",
      image: "/media/cellular-intervention.jpg",
      tags: ["Therapeutics", "Cell Biology", "Precision Medicine"]
    },
    {
      id: "genetic-markers",
      title: "Genetic Markers",
      description: "Identifying critical tumor development indicators",
      fullDescription: "Comprehensive research into genetic markers that play crucial roles in tumor development, progression, and potential therapeutic targeting.",
      image: "/media/genetic-markers.jpg",
      tags: ["Genetics", "Oncology", "Biomarkers"]
    },
    {
      id: "immunotherapy",
      title: "Advanced Immunotherapy",
      description: "Enhancing immune system cancer response",
      fullDescription: "Groundbreaking immunotherapy research to enhance the body's natural defense mechanisms against cancer, exploring novel immune modulation techniques.",
      image: "/media/immunotherapy.jpg",
      tags: ["Immunology", "Cancer Treatment", "Immune Therapy"]
    }
  ];

  // News Items with more categories
  const newsItems: NewsItem[] = [
    {
      id: "breakthrough-2024",
      title: "Revolutionary Cancer Cell Targeting Method",
      date: "March 1, 2024",
      summary: "Breakthrough in targeting highly resistant cancer cell populations using novel molecular techniques.",
      category: "Research",
      link: "/news/breakthrough-2024"
    },
    {
      id: "grant-awarded",
      title: "$2.5M Research Grant Secured",
      date: "February 15, 2024",
      summary: "Major funding awarded to advance molecular mapping and cellular intervention research.",
      category: "Funding",
      link: "/news/grant-awarded"
    },
    {
      id: "international-collaboration",
      title: "Global Research Network Expansion",
      date: "January 20, 2024",
      summary: "Establishing collaborative research partnerships with leading international oncology institutions.",
      category: "Collaboration",
      link: "/news/international-collaboration"
    }
  ];

  // Advanced background animation logic
  useEffect(() => {
    const animationSequence = () => {
      setAnimationStage('initial');
      setTimeout(() => setAnimationStage('map-zoom'), 1000);
      setTimeout(() => setAnimationStage('cells-zoom'), 3000);
      setTimeout(() => setAnimationStage('cells-out'), 5000);
      setTimeout(() => setAnimationStage('initial'), 7000);
    };

    animationSequence();
    const interval = setInterval(animationSequence, 8000);
    return () => clearInterval(interval);
  }, []);

  // Variants for background animations
  const backgroundVariants = {
    initial: { 
      scale: 1, 
      opacity: 0.3,
      transition: { duration: 1 }
    },
    'map-zoom': { 
      scale: 1.5, 
      opacity: 0.5,
      transition: { duration: 2, ease: "easeInOut" }
    },
    'cells-zoom': { 
      scale: 2, 
      opacity: 0.7,
      transition: { duration: 2, ease: "easeInOut" }
    },
    'cells-out': { 
      scale: 1, 
      opacity: 0.3,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  // Filter research topics
  const filteredResearch = filter 
    ? researchTopics.filter(topic => topic.tags.includes(filter)) 
    : researchTopics;

  return (
    <div className={styles.container}>
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <section className={styles.heroSection}>
        <AnimatePresence>
          <motion.div 
            key="nautical-map"
            className={styles.backgroundImage}
            variants={backgroundVariants}
            animate={animationStage}
            initial="initial"
          >
            <Image 
              src="/media/Nautical.png" 
              alt="Nautical Map Background" 
              layout="fill" 
              objectFit="cover" 
              priority 
            />
          </motion.div>

          {(animationStage === 'cells-zoom' || animationStage === 'cells-out') && (
            <motion.div 
              key="cells"
              className={styles.backgroundImage}
              style={{ zIndex: 2 }}
              variants={backgroundVariants}
              animate={animationStage}
              initial={{ scale: 1.5, opacity: 0 }}
            >
              <Image 
                src="/media/cells.jpg" 
                alt="Cancer Cells" 
                layout="fill" 
                objectFit="cover" 
                priority 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: animationStage === 'initial' ? 1 : 0.5, 
            scale: 1 
          }}
          transition={{ duration: 1 }}
        >
          <h1>ADJ Laboratory</h1>
          <p>Pioneering Cancer Research through Innovative Science</p>
        </motion.div>
      </section>

      {/* Research Topics Section */}
      <section 
        ref={researchRef} 
        className={styles.researchSection}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isResearchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Research Focus
        </motion.h2>

        {/* Research Filters */}
        <div className={styles.filterContainer}>
          {Array.from(new Set(researchTopics.flatMap(topic => topic.tags))).map(tag => (
            <button 
              key={tag}
              onClick={() => setFilter(filter === tag ? null : tag)}
              className={`${styles.filterButton} ${filter === tag ? styles.activeFilter : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.researchGrid}>
          {filteredResearch.map((topic) => (
            <motion.div 
              key={topic.id}
              className={styles.researchCard}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedResearch(topic)}
            >
              <div className={styles.cardImageContainer}>
                <Image 
                  src={topic.image} 
                  alt={topic.title} 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className={styles.cardTags}>
                  {topic.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section 
        ref={newsRef} 
        className={styles.newsSection}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isNewsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Latest Research News
        </motion.h2>

        <div className={styles.newsGrid}>
          {newsItems.map((news) => (
            <motion.div 
              key={news.id}
              className={styles.newsCard}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.newsCategory}>{news.category}</div>
              <h3>{news.title}</h3>
              <p className={styles.newsDate}>{news.date}</p>
              <p>{news.summary}</p>
              {news.link && (
                <Link href={news.link} className={styles.readMore}>
                  Read More
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Modal */}
      <AnimatePresence>
        {selectedResearch && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResearch(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton} 
                onClick={() => setSelectedResearch(null)}
              >
                ×
              </button>
              <div className={styles.modalHeader}>
                <h2>{selectedResearch.title}</h2>
                <div className={styles.modalTags}>
                  {selectedResearch.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.modalImageContainer}>
                <Image 
                  src={selectedResearch.image} 
                  alt={selectedResearch.title} 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <p className={styles.modalDescription}>
                {selectedResearch.fullDescription}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}