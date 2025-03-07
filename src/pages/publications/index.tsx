"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Publications.module.css';
import NeonIsometricMaze from '@/components/NeonIsometricMaze';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

// Define interfaces for the PubMed API response
interface PubMedSearchResponse {
  esearchresult: {
    count: string;
    retmax: string;
    retstart: string;
    idlist: string[];
  };
}

interface ArticleId {
  idtype: string;
  value: string;
}

interface Author {
  name: string;
}

interface PubMedArticle {
  title?: string;
  fulljournalname?: string;
  source?: string;
  pubdate?: string;
  articleids?: ArticleId[];
  authors?: Author[];
  abstract?: string;
}

interface PubMedResult {
  uids: string[];
  [key: string]: PubMedArticle | string[];
}

interface PubMedSummaryResponse {
  result: PubMedResult;
}

interface Publication {
  id: string;
  title: string;
  journal?: string;
  year?: string;
  url: string;
  type: string;
  doi?: string;
  authors: string[];
  abstract?: string;
}

export default function Publications() {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    const initEngine = async () => {
      await initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };
    
    initEngine().catch(console.error);
  }, []);
  
  const [publications, setPublications] = useState<Publication[]>([]);
  const [sortedPublications, setSortedPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('year-desc');
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true });

  // You can replace this with your name or specific search terms
  const AUTHOR_NAME = 'Jeyasekharan AD[Author]';
  // Maximum number of results to fetch
  const MAX_RESULTS = 30;
  
  // Animation variants
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
        staggerChildren: 0.1
      }
    }
  };

  // Function to search PubMed for article IDs
  const searchPubMed = async (query: string, max: number): Promise<string[]> => {
    try {
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${max}&retmode=json`;
      
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch from PubMed');
      }
      
      const data: PubMedSearchResponse = await response.json();
      return data.esearchresult.idlist;
    } catch (error) {
      console.error("Error searching PubMed:", error);
      return [];
    }
  };

  // Function to fetch article details
  const fetchArticleDetails = async (ids: string[]): Promise<Publication[]> => {
    if (ids.length === 0) return [];
    
    try {
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
      
      const response = await fetch(summaryUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch article details from PubMed');
      }
      
      const data: PubMedSummaryResponse = await response.json();
      
      const articles: Publication[] = [];
      
      for (const id of data.result.uids) {
        // Type assertion here because we know the structure but TypeScript doesn't
        const article = data.result[id] as PubMedArticle;
        
        // Extract year from pubdate
        let year = undefined;
        if (article.pubdate) {
          const yearMatch = article.pubdate.match(/(\d{4})/);
          if (yearMatch) {
            year = yearMatch[1];
          }
        }
        
        // Extract DOI if available
        let doi = undefined;
        if (article.articleids) {
          const doiObj = article.articleids.find((idObj) => idObj.idtype === 'doi');
          if (doiObj) {
            doi = doiObj.value;
          }
        }
        
        articles.push({
          id: id,
          title: article.title || 'No title available',
          journal: article.fulljournalname || article.source || undefined,
          year: year,
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
          type: 'journal-article',
          doi: doi,
          authors: article.authors?.map((author) => author.name) || [],
          abstract: article.abstract || undefined
        });
      }
      
      return articles;
    } catch (error) {
      console.error("Error fetching article details:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        
        // Step 1: Search PubMed for article IDs
        const articleIds = await searchPubMed(AUTHOR_NAME, MAX_RESULTS);
        
        if (articleIds.length === 0) {
          setPublications([]);
          setLoading(false);
          return;
        }
        
        // Step 2: Fetch details for those IDs
        const articleDetails = await fetchArticleDetails(articleIds);
        setPublications(articleDetails);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback data in case of error
        setPublications([
          {
            id: '1',
            title: "Example publication (Data unavailable)",
            journal: "Connect to PubMed to see publications",
            year: "2024",
            url: "#",
            type: "journal-article",
            authors: ["Connect to view authors"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [AUTHOR_NAME]);
  
  useEffect(() => {
    const sortPublications = () => {
      const sorted = [...publications].sort((a, b) => {
        switch (sortBy) {
          case 'year-desc':
            return (b.year || '0') > (a.year || '0') ? 1 : -1;
          case 'year-asc':
            return (a.year || '0') > (b.year || '0') ? 1 : -1;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
      setSortedPublications(sorted);
    };

    sortPublications();
  }, [publications, sortBy]);
 
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
      <motion.div 
        className={styles.sectionTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <div className={styles.decorativeElement}><NeonIsometricMaze /></div>
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
            ref={headerRef}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className={styles.header}
          >
            <h1>Publications</h1>
            <div className={styles.underline} />
            
            <motion.div 
              variants={fadeInUp}
              className={styles.sortWrapper}
            >
              <label htmlFor="sortPublications">Sort by:</label>
              <select
                id="sortPublications"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </motion.div>
          </motion.div>

          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className={styles.content}
          >
            {loading && (
              <motion.div 
                variants={fadeInUp}
                className={styles.loadingContainer}
              >
                <div className={styles.loadingSpinner}></div>
                <p>Loading publications...</p>
              </motion.div>
            )}
            
            {error && !publications.length && (
              <motion.div 
                variants={fadeInUp}
                className={styles.errorContainer}
              >
                <h3>Error fetching publications</h3>
                <p>{error}</p>
                <p>Please try again later or check your connection</p>
              </motion.div>
            )}

            {!loading && !error && sortedPublications.length === 0 && (
              <motion.div 
                variants={fadeInUp}
                className={styles.emptyContainer}
              >
                <h3>No publications found</h3>
                <p>Publications will appear here once available</p>
              </motion.div>
            )}

            {sortedPublications.map((pub) => (
              <motion.div
                key={pub.id}
                variants={fadeInUp}
                className={styles.publication}
                initial="hidden"
                whileInView="visible" 
                viewport={{ once: true, amount: 0.5 }}
              >
                <h2>{pub.title}</h2>
                {pub.authors && pub.authors.length > 0 && (
                  <p className={styles.authors}>
                    {pub.authors.join(', ')}
                  </p>
                )}
                {pub.journal && (
                  <p className={styles.journal}>{pub.journal}</p>
                )}
                <div className={styles.metadata}>
                  {pub.year && (
                    <span className={styles.year}>
                      <span className={styles.metaLabel}>Year:</span> {pub.year}
                    </span>
                  )}
                  {pub.type && (
                    <span className={styles.type}>
                      <span className={styles.metaLabel}>Type:</span> {pub.type.replace(/-/g, ' ')}
                    </span>
                  )}
                </div>
                <div className={styles.actions}>
                  {pub.doi && (
                    <a 
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={styles.link}
                    >
                      View Publication (DOI)
                    </a>
                  )}
                  {pub.url && (
                    <a 
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={styles.link}
                    >
                      View on PubMed
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Stats section */}
          {!loading && sortedPublications.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.statsSection}
            >
              <h2>Publication Metrics</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{sortedPublications.length}</div>
                  <div className={styles.statLabel}>Total Publications</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>
                    {new Set(sortedPublications.map(p => p.year).filter(Boolean)).size}
                  </div>
                  <div className={styles.statLabel}>Years Active</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>
                    {sortedPublications.filter(p => p.journal).length}
                  </div>
                  <div className={styles.statLabel}>Journal Articles</div>
                </div>
              </div>
            </motion.section>
          )}
        </main>
      </div>
    </>
  );
}