"use client"
import { motion } from "framer-motion";
import Masonry from "@/components/Masonry/Masonry";
import NeonIsometricMaze from "@/components/NeonIsometricMaze";
import styles from "./lab-events.module.css"
// import CircularGalleryWithFlip from "@/components/CircularGallery/CircularGallery";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
export default function LabEvents(){

  
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };
  
  
    const charAnimation = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.04,
          duration: 0.8,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      }),
    };
  
    const title = "ADJ Lab Events";

    const data = [
      { id: 1, image: 'https://picsum.photos/id/10/200/300', height: 400 },
      { id: 2, image: 'https://picsum.photos/id/14/200/300', height: 300 },
      { id: 3, image: 'https://picsum.photos/id/15/200/300', height: 400 },
      { id: 4, image: 'https://picsum.photos/id/16/200/300', height: 300 },
      { id: 5, image: 'https://picsum.photos/id/17/200/300', height: 400 },
      { id: 6, image: 'https://picsum.photos/id/19/200/300', height: 300 },
      { id: 7, image: 'https://picsum.photos/id/37/200/300', height: 300 },
      { id: 8, image: 'https://picsum.photos/id/39/200/300', height: 300 },
      { id: 9, image: 'https://picsum.photos/id/85/200/300', height: 400 },
      { id: 10, image: 'https://picsum.photos/id/103/200/300', height: 400 }
    ];

    return(
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
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
            <div className={styles.titleUnderline} />
          </motion.div>
          
        
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            
          >
            {/* <div className={styles.circularGallery}>
            <CircularGalleryWithFlip bend={3} textColor="#6b46c1" borderRadius={0.05} />
            </div> */}
          <div className={styles.photoGallery}>
          <Masonry data={data} />
          </div>
          </motion.div>
          
          </main>
          </div>

        </Curve>
        </>
    )
}