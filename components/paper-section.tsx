"use client";

import { useEffect, useRef, useState } from "react";

interface PaperSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function PaperSection({ children, id, className }: PaperSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        /* Fire while the block is still below the fold so motion finishes before reading */
        threshold: 0.05,
        rootMargin: "0px 0px 24% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`paper-sheet ${isVisible ? "paper-sheet-visible" : ""} ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
