/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="histoire"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-cream-100 to-cream-200 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&q=80"
          alt="Honeycomb background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/90 via-cream-100/70 to-cream-200/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-dark leading-tight">
            <span className="text-gradient">L&apos;élan</span> vers
            <br />
            l&apos;excellence
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="text-lg md:text-xl text-dark/80 leading-relaxed">
              <span className="font-serif text-2xl text-honey">Colonie</span> représente une nouvelle génération de miel qui apporte un niveau supérieur de qualité et de pureté à l&apos;apiculture ivoirienne.
            </p>
            <p className="text-base md:text-lg text-dark/60 leading-relaxed">
              Des méthodes de récolte traditionnelles et une infrastructure premium, une traçabilité irréprochable et des saveurs impressionnantes, des engagements écologiques et une vision tournée vers l&apos;avenir définissent une nouvelle référence pour l&apos;excellence du miel.
            </p>
            <p className="text-lg md:text-xl font-medium text-dark">
              À ce niveau, Colonie n&apos;a pas de concurrent.
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-3 text-honey hover:text-honey-dark transition-colors group"
            >
              <span className="text-sm font-medium tracking-wider uppercase">
                Découvrir nos produits
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Image Cards */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/story1.jpeg"
                    alt="Miel naturel"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/story2.jpeg"
                    alt="Rayon de miel"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/story3.jpeg"
                    alt="Abeilles sur rayon"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/story4.jpeg  "
                    alt="Pot de miel"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-honey text-white px-6 py-4 rounded-xl shadow-lg">
              <p className="text-3xl font-serif font-bold">100%</p>
              <p className="text-sm tracking-wider">NATUREL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
