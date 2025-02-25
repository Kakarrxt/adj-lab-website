// Components/Anand/index.tsx
"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Anand.module.css";
import { Twitter, Linkedin, Mail } from "lucide-react";

export default function AnandPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <div className={styles.profile}>
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/media/ADJ-Profile2.png" // Update with your actual image path
              alt="Anand Jeyasekharan"
              width={300}
              height={400}
              className={styles.profileImage}
              priority
            />
          </motion.div>

          <motion.div
            className={styles.content}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              className={styles.name}
            >
              Anand JEYASEKHARAN
            </motion.h1>

            <motion.div 
              variants={fadeInUp}
              className={styles.description}
            >
              <p>
                Work in the ADJ laboratory focuses on how the immune system recognizes cancer cells upon treatment with DNA damaging chemotherapy. 
                Our eventual aim is to use this information to guide the rational design of immunotherapy-chemotherapy combinations for cancer treatment. 
                Our research involves both fundamental research (molecular and cellular biology of chemotherapy responses) and translational research 
                (using clinical samples) in a variety of cancer types. We have a specific interest in lymphomas; and work closely with colleagues in 
                the NUH Lymphoma team to develop novel therapeutic strategies for clinical use.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className={styles.contact}
            >
              <div className={styles.email}>
                <Mail size={20} />
                <span>csiadj[at]nus.edu.sg</span>
              </div>

              <div className={styles.socialLinks}>
                <motion.a
                  href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fcsi.nus.edu.sg%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Eadj_23&region=follow_link&screen_name=adj_23" // Update with actual Twitter link
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.socialLink}
                >
                  <Twitter size={24} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/anand-jeyasekharan-920694141/" // Update with actual LinkedIn link
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.socialLink}
                >
                  <Linkedin size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}