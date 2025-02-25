"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Publications.module.css';
import NeonIsometricMaze from '@/components/NeonIsometricMaze';

// Define proper interfaces for the API response
interface OrcidResponse {
  group: Array<{
    'work-summary': Array<WorkSummary>;
  }>;
}

interface WorkSummary {
  'put-code': number;
  title: {
    title: {
      value: string;
    };
  };
  'journal-title'?: {
    value: string;
  };
  'publication-date'?: {
    year?: {
      value: string;
    };
    month?: {
      value: string;
    };
    day?: {
      value: string;
    };
  };
  url?: {
    value: string;
  };
  type: string;
  'external-ids'?: {
    'external-id': Array<{
      'external-id-type': string;
      'external-id-value': string;
    }>;
  };
  contributors?: {
    contributor: Array<{
      'credit-name': {
        value: string;
      };
    }>;
  };
}

interface Publication {
  id: number;
  title: string;
  journal?: string;
  year?: string;
  url?: string;
  type: string;
  doi?: string;
  authors?: string[];
}

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [sortedPublications, setSortedPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('year-desc');
  
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true });

  const ORCID_ID = '0000-0001-9816-6137';
  
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

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pub.orcid.org/v3.0/${ORCID_ID}/works`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch publications');
        }

        const data: OrcidResponse = await response.json();
        
        const formattedPublications: Publication[] = data.group.map(item => {
          const work = item['work-summary'][0];
          return {
            id: work['put-code'],
            title: work.title.title.value,
            journal: work['journal-title']?.value,
            year: work['publication-date']?.year?.value,
            url: work.url?.value,
            type: work.type,
            doi: work['external-ids']?.['external-id']
              ?.find(id => id['external-id-type'] === 'doi')
              ?.['external-id-value'],
            authors: work.contributors?.contributor
              ?.map(author => author['credit-name'].value) || []
          };
        });

        setPublications(formattedPublications);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback data in case of error
        setPublications([
          {
            id: 1,
            title: "Example publication (Data unavailable)",
            journal: "Connect to ORCID to see publications",
            year: "2024",
            type: "journal-article",
            authors: ["Connect to view authors"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [ORCID_ID]);
  
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
                  {!pub.doi && pub.url && (
                    <a 
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={styles.link}
                    >
                      View Publication
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Add featured publications or stats section */}
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
                    {new Set(sortedPublications.map(p => p.year)).size}
                  </div>
                  <div className={styles.statLabel}>Years Active</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>
                    {sortedPublications.filter(p => p.type === 'journal-article').length}
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