"use client"

import { motion } from "framer-motion";
import styles from "./AnimatedTitle.module.css";

type AnimatedTitleProps = {
  title: string;
};

const charAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.04,
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

export default function AnimatedTitle({ title }: AnimatedTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}  
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
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}
