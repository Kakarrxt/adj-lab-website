"use client";
//Made changes
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/pages/navbar/index';
import styles from './Publications.module.css';

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

  const ORCID_ID = '0000-0001-9816-6137';

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
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [ORCID_ID]);
  
  console.log(publications);
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
    <div className={styles.container}>
      
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.hero}
        >
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            Publications
          </motion.h1>

          <div className={styles.sortContainer}>
            <select
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.content}
        >
          {loading && (
            <div className={styles.loading}>Loading publications...</div>
          )}
          
          {error && (
            <div className={styles.error}>Error: {error}</div>
          )}

          {!loading && !error && sortedPublications.length === 0 && (
            <div className={styles.empty}>No publications found.</div>
          )}

          {!loading && !error && sortedPublications.map((pub, index) => (
            <motion.div
              key={pub.id}
              className={styles.publication}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                {pub.year && <span className={styles.year}>{pub.year}</span>}
                {pub.type && <span className={styles.type}>{pub.type}</span>}
              </div>
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
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

