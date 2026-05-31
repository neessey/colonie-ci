/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

const engagements = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "100% Naturel",
    description: "Aucun additif, conservateur ou traitement thermique. Notre miel est pur et brut, tel que la nature l'a conçu.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Éco-responsable",
    description: "Nos pratiques apicoles respectent l'environnement et contribuent à la préservation des abeilles et de la biodiversité.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Commerce équitable",
    description: "Nous soutenons les apiculteurs locaux avec une rémunération juste et des programmes de formation continue.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Qualité garantie",
    description: "Chaque lot est testé et certifié pour garantir une qualité supérieure et une traçabilité complète.",
  },
];

export default function EngagementsSection() {
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
      id="engagements"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-cream-200 to-cream-100 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-honey/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-honey/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-honey text-sm tracking-[0.3em] uppercase mb-4">
            Nos Engagements
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-dark leading-tight max-w-3xl mx-auto">
            Conçu avec <span className="text-gradient">passion</span>
            <br />
            pour la nature
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/engagement.jpeg"
                alt="Abeilles et miel"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-honey rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-dark">4.9/5</p>
                  <p className="text-sm text-dark/60">Satisfaction client</p>
                </div>
              </div>
              <p className="text-sm text-dark/70 leading-relaxed">
                &ldquo;Un miel d&apos;exception qui rappelle les saveurs authentiques de notre terroir.&rdquo;
              </p>
            </div>
          </div>

          {/* Engagements Grid */}
          <div className="space-y-6">
            {engagements.map((engagement, index) => (
              <div
                key={engagement.title}
                className={`group p-6 bg-white rounded-2xl shadow-lg border border-honey/10 hover:border-honey/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-honey/10 rounded-xl flex items-center justify-center text-honey group-hover:bg-honey group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {engagement.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-dark mb-2">
                      {engagement.title}
                    </h3>
                    <p className="text-dark/60 leading-relaxed">
                      {engagement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
