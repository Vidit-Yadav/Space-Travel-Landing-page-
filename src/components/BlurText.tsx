import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Only trigger once to ensure the heading stays legible after scroll
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const words = text.split(" ");

  return (
    <p
      id={`blur-text-${text.slice(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => {
        const delay = (i * 100) / 1000; // delay in seconds
        return (
          <motion.span
            key={i}
            id={`blur-word-${i}`}
            initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            animate={
              isInView
                ? {
                    filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
                : undefined
            }
            transition={
              isInView
                ? {
                    duration: 0.7,
                    times: [0, 0.5, 1],
                    ease: "easeOut",
                    delay: delay,
                  }
                : undefined
            }
            style={{
              display: "inline-block",
              marginRight: "0.28em",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
