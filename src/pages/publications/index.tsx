"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Publications.module.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import Curve from '@/components/Curve/Curve'
import Aurora from '@/components/Aurora/Aurora';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    
    setTimeout(() => setIsLoaded(true), 300);
  }, []);
  
  const [publications, setPublications] = useState<Publication[]>([]);
  const [sortedPublications, setSortedPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('year-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPublications, setCurrentPublications] = useState<Publication[]>([]);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true });

  const AUTHOR_NAME = 'Jeyasekharan AD[Author]';
  const MAX_RESULTS = 50;

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
        const article = data.result[id] as PubMedArticle;

        let year = undefined;
        if (article.pubdate) {
          const yearMatch = article.pubdate.match(/(\d{4})/);
          if (yearMatch) {
            year = yearMatch[1];
          }
        }

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
        const articleIds = await searchPubMed(AUTHOR_NAME, MAX_RESULTS);
        
        if (articleIds.length === 0) {
          setPublications([]);
          setLoading(false);
          return;
        }

        const articleDetails = await fetchArticleDetails(articleIds);
        setPublications(articleDetails);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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

  useEffect(() => {
    if (sortedPublications.length > 0) {
      const newTotalPages = Math.ceil(sortedPublications.length / itemsPerPage);
      setTotalPages(newTotalPages);
      
      if (currentPage > newTotalPages) {
        setCurrentPage(1);
      }

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentPublications(sortedPublications.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      setCurrentPublications([]);
      setTotalPages(1);
    }
  }, [sortedPublications, currentPage, itemsPerPage]);
  
  const paginate = (pageNumber: number) => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrentPage(pageNumber);
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
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

  const title = "Publications";
  const charAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 +  i * 0.04,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };
  
  return (
    <>
    <Curve backgroundColor="#f1f1f1">
    <div className={styles.backgroundGradient}></div>
      
      
      <motion.div 
        className={styles.sectionTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.decorativeElement}>
          <Aurora
            colorStops={["#A855F7", "#9333EA", "#6B21A8"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
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
 
        <h1 aria-label={title}>
              {title.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charAnimation}
                  initial="hidden"
                  animate="visible"
                  className={styles.animatedChar}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          <motion.div 
          className={styles.underline} 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 1, 
            ease: "easeOut" 
          }}
          />
            
            <motion.div 
              variants={fadeInUp}
              className={styles.filterBar}
            >
              <div className={styles.sortWrapper}>
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
              </div>
              
              <div className={styles.paginationSettings}>
                <label htmlFor="itemsPerPage">Show:</label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className={styles.paginationSelect}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <span>per page</span>
              </div>
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

            {currentPublications.map((pub) => (
              <motion.div
                key={pub.id}
                variants={fadeInUp}
                className={styles.publication}
                initial="hidden"
                whileInView="visible" 
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.2, // Reduced duration for faster transitions
                  ease: "easeOut",
                  delay: currentPublications.findIndex(p => p.id === pub.id) * 0.04 // Adjusted delay for faster stagger
                }}
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
            
            {/* Pagination controls */}
            {!loading && sortedPublications.length > 0 && (
              <motion.div 
                variants={fadeInUp}
                className={styles.pagination}
              >
                <div className={styles.paginationInfo}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedPublications.length)} of {sortedPublications.length} publications
                </div>
                <div className={styles.paginationControls}>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`${styles.paginationButton} ${currentPage === 1 ? styles.paginationButtonDisabled : ''}`}
                    aria-label="Previous page"
                    type="button"
                  >
                    &laquo; Prev
                  </button>
                  
                  {/* Page numbers */}
                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      // Show ellipsis for many pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`${styles.pageNumber} ${pageNum === currentPage ? styles.currentPage : ''}`}
                            aria-label={`Page ${pageNum}`}
                            aria-current={pageNum === currentPage ? 'page' : undefined}
                            type="button"
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        (pageNum === currentPage - 2 && currentPage > 3) ||
                        (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return <span key={pageNum} className={styles.ellipsis}>...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`${styles.paginationButton} ${currentPage === totalPages ? styles.paginationButtonDisabled : ''}`}
                    aria-label="Next page"
                    type="button"
                  >
                    Next &raquo;
                  </button>
                </div>
              </motion.div>
            )}
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

      </Curve>
    </>
  );
}