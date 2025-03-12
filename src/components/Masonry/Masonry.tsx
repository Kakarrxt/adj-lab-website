import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./Masonry.css";

interface MasonryItem {
  id: string | number;
  height: number;
  image: string;
  backContent?: {
    title: string;
    description: string;
  };
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  width: number;
  height: number; // This represents the scaled height
}

interface MasonryProps {
  data: MasonryItem[];
}

const Masonry: React.FC<MasonryProps> = ({ data }) => {
  const [columns, setColumns] = useState<number>(2);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [flippedCards, setFlippedCards] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1500px)").matches) {
        setColumns(5);
      } else if (window.matchMedia("(min-width: 1000px)").matches) {
        setColumns(4);
      } else if (window.matchMedia("(min-width: 600px)").matches) {
        setColumns(3);
      } else {
        setColumns(1); // Breakpoint for mobile devices
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [heights, gridItems] = useMemo<[number[], GridItem[]]>(() => {
    const heights = new Array(columns).fill(0);
    const gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const toggleFlip = (id: string | number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div
      ref={ref}
      className="masonry"
      style={{
        height: Math.max(...heights),
        position: 'relative'
      }}
    >
      <AnimatePresence>
        {gridItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: item.x,
              y: item.y,
              width: item.width,
              height: item.height,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 50,
              mass: 1,
            }}
            style={{
              position: 'absolute',
              padding: '8px',
            }}
          >
            <div className="card-container" onClick={() => toggleFlip(item.id)}>
              <motion.div
                className="card-inner"
                animate={{
                  rotateY: flippedCards[item.id] ? 180 : 0,
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Front Face (Image) */}
                <div className="card-face card-front">
                  <motion.div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px',
                    }}
                    initial={false}
                    animate={{
                      scale: flippedCards[item.id] ? 0.95 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Back Face (Information) */}
                <div className="card-face card-back">
                  <h3 className="text-xl font-semibold mb-4">
                    {item.backContent?.title || "Image Information"}
                  </h3>
                  <p className="text-sm text-center mb-6">
                    {item.backContent?.description || "No description available"}
                  </p>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-50" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Masonry;