/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

interface HiveGridProps {
  filled: number;
  total: number;
  justFilledAnimation?: boolean;
}

function Hexagon({ filled, delay, pop }: { filled: boolean; delay: number; pop: boolean }) {
  return (
    <svg
      viewBox="0 0 100 115"
      className={`w-full h-full transition-all duration-500 ${
        pop ? "animate-hive-pop" : ""
      }`}
      style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
    >
      <polygon
        points="50,2 97,28 97,87 50,113 3,87 3,28"
        fill={filled ? "url(#hexGradient)" : "rgba(245,240,232,0.06)"}
        stroke={filled ? "#F5A623" : "rgba(245,240,232,0.2)"}
        strokeWidth="3"
        className={filled ? "drop-shadow-[0_0_8px_rgba(245,166,35,0.5)]" : ""}
      />
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5C563" />
          <stop offset="100%" stopColor="#D4880F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HiveGrid({ filled, total, justFilledAnimation }: HiveGridProps) {
  const [animatedIndex, setAnimatedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (justFilledAnimation) {
      setAnimatedIndex(filled - 1);
      const t = setTimeout(() => setAnimatedIndex(null), 900);
      return () => clearTimeout(t);
    }
  }, [justFilledAnimation, filled]);

  const cells = Array.from({ length: total }, (_, i) => i < filled);

  return (
    <div className="grid grid-cols-4 gap-2 max-w-[240px] mx-auto">
      {cells.map((isFilled, i) => (
        <div key={i} className="aspect-[100/115]">
          <Hexagon filled={isFilled} delay={i * 40} pop={animatedIndex === i} />
        </div>
      ))}
    </div>
  );
}