"use client"
import { motion } from "framer-motion";
import Masonry from "@/components/Masonry/Masonry";
import styles from "./lab-events.module.css"
// import CircularGalleryWithFlip from "@/components/CircularGallery/CircularGallery";
import Curve from '@/components/Curve/Curve'
import Aurora from "@/components/Aurora/Aurora";
import { useEffect, useState } from "react";
import AnimatedTitle from "@/components/AnimatedTitle";


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
          delay: 0.8 +  i * 0.04,
          duration: 0.8,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      }),
    };

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); 
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
        
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
  
    const title = "ADJ Lab Events";

    // Create SVG placeholders directly as Base64 encoded images
    // Using pastel purple background (#d8ccf1) with white text
    const placeholderSVGBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMjAwIDMwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNkOGNjZjEiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+VG8gQmUgQWRkZWQ8L3RleHQ+PC9zdmc+";

    // Modified data array with properly formatted image URLs and added backContent
    const data = [
      { 
        id: 1, 
        image: placeholderSVGBase64,
        height: 400,
        backContent: {
          title: "Event 1",
          description: "Description for Event 1"
        }
      },
      { 
        id: 2, 
        image: placeholderSVGBase64,
        height: 300,
        backContent: {
          title: "Event 2",
          description: "Description for Event 2"
        }
      },
      { 
        id: 3, 
        image: placeholderSVGBase64,
        height: 400,
        backContent: {
          title: "Event 3",
          description: "Description for Event 3"
        }
      },
      { 
        id: 4, 
        image: placeholderSVGBase64,
        height: 300,
        backContent: {
          title: "Event 4",
          description: "Description for Event 4"
        }
      },
      { 
        id: 5, 
        image: placeholderSVGBase64,
        height: 400,
        backContent: {
          title: "Event 5",
          description: "Description for Event 5"
        }
      },
      { 
        id: 6, 
        image: placeholderSVGBase64,
        height: 300,
        backContent: {
          title: "Event 6",
          description: "Description for Event 6"
        }
      },
      { 
        id: 7, 
        image: placeholderSVGBase64,
        height: 300,
        backContent: {
          title: "Event 7",
          description: "Description for Event 7"
        }
      },
      { 
        id: 8, 
        image: placeholderSVGBase64,
        height: 300,
        backContent: {
          title: "Event 8",
          description: "Description for Event 8"
        }
      },
      { 
        id: 9, 
        image: placeholderSVGBase64,
        height: 400,
        backContent: {
          title: "Event 9",
          description: "Description for Event 9"
        }
      },
      { 
        id: 10, 
        image: placeholderSVGBase64,
        height: 400,
        backContent: {
          title: "Event 10",
          description: "Description for Event 10"
        }
      }
    ];

    return(
        <>
      {!isMobile && <Curve backgroundColor="#f1f1f1">
        <div className={styles.backgroundGradient}></div>
      </Curve>}
        <motion.div 
        className={styles.sectionTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
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
        </>
    )
}