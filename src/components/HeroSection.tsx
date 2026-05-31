/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Zoom progressif du miel
  const scale = 1 + Math.min(scrollY / 600, 0.8);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 hexagon-pattern opacity-50" />

      {/* Honeycomb Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-honey">
          <polygon
            points="50,3 95,25 95,75 50,97 5,75 5,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 w-48 h-48 opacity-15 rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-honey">
          <polygon
            points="50,3 95,25 95,75 50,97 5,75 5,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Floating Honey Drops */}
      <div className="absolute top-1/4 left-1/4 w-4 h-6 bg-gradient-to-b from-honey-400 to-honey-600 rounded-full opacity-40 animate-float" />
      <div className="absolute top-1/3 right-1/3 w-3 h-5 bg-gradient-to-b from-honey-300 to-honey-500 rounded-full opacity-30 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-5 h-8 bg-gradient-to-b from-honey-400 to-honey-700 rounded-full opacity-35 animate-float" style={{ animationDelay: "2s" }} />

      {/* Main Content */}
      <div className="relative z-10 w-full px-4">

        {/* COLONIE letters */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12">
          {["C", "O", "L", "O", "N", "I", "E"].map((letter, index) => (
            <span
              key={index}
              className={`text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-serif font-light tracking-tight text-dark/90 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* 🐝 MIEL ZOOM (scroll effect) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 sm:w-40 sm:h-48 md:w-56 md:h-64 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <img
            src="/miel.png"
            alt="Pot de miel"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <div
          className={`text-center mt-14 transition-all duration-700 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-sm sm:text-base md:text-lg font-light tracking-[0.2em] text-dark/60 uppercase">
            L&apos;Excellence du Miel Ivoirien
          </p>
        </div>

       
      </div>

    </section>
  );
}