/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Régions", value: "5+", description: "de Côte d'Ivoire" },
  { label: "Apiculteurs", value: "50+", description: "partenaires locaux" },
  { label: "Ruches", value: "200+", description: "en activité" },
  { label: "Clients", value: "1000+", description: "satisfaits" },
];

export default function LocationSection() {
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
      id="localisation"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-cream-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 md:mb-24">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-honey text-sm tracking-[0.3em] uppercase mb-4">
              Notre Terroir
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-dark leading-tight">
              Au coeur de la
              <br />
              <span className="text-gradient">Côte d&apos;Ivoire</span>
            </h2>
          </div>
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
              Colonie est conçu pour devenir le symbole de l&apos;excellence apicole ivoirienne, puisant dans la richesse de nos terroirs pour offrir des miels d&apos;exception.
            </p>
          </div>
        </div>

        {/* Map & Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Map Visualization */}
          <div
            className={`lg:col-span-3 relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-cream-200 to-cream-100 rounded-3xl overflow-hidden relative shadow-xl">
              <img
                src="/ruche.png"
                alt="Paysage de Côte d'Ivoire"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

              {/* Location Markers */}
              <div className="absolute inset-0 p-8">
                {/* Abidjan */}
                <div className="absolute bottom-1/4 right-1/3 group">
                  <div className="w-4 h-4 bg-honey rounded-full animate-pulse shadow-lg shadow-honey/50" />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <p className="font-medium text-dark">Abidjan</p>
                    <p className="text-xs text-dark/60">Siège social</p>
                  </div>
                </div>

                {/* Bouaké */}
                <div className="absolute top-1/3 right-1/2 group">
                  <div className="w-3 h-3 bg-honey/70 rounded-full animate-pulse shadow-lg shadow-honey/30" style={{ animationDelay: "0.5s" }} />
                </div>

                {/* Korhogo */}
                <div className="absolute top-1/4 left-1/3 group">
                  <div className="w-3 h-3 bg-honey/70 rounded-full animate-pulse shadow-lg shadow-honey/30" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-xl">
                <p className="text-2xl font-serif font-bold text-dark">Côte d&apos;Ivoire</p>
                <p className="text-sm text-dark/60">Nos zones de récolte</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-honey/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-honey/10 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-dark">Notre siège</h4>
                  <p className="text-sm text-dark/60">Abidjan, Cocody</p>
                </div>
              </div>
              <p className="text-m text-dark/70 leading-relaxed">
                Notre siège social est situé à Abidjan, au coeur du quartier dynamique de Cocody, permettant une coordination optimale de nos activités.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-lg border border-honey/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-honey/10 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-dark">Zones de récolte</h4>
                  <p className="text-sm text-dark/60">Nord et Centre</p>
                </div>
              </div>
              <p className="text-m text-dark/70 leading-relaxed">
                Nos ruches sont implantées dans les régions du Nord et du Centre, où la biodiversité florale garantit la qualité exceptionnelle de nos miels.
              </p>
            </div>

            <a
              href="/contact"
              className="flex items-center gap-3 text-honey hover:text-honey-dark transition-colors group"
            >
              <div className="w-10 h-10 border border-honey rounded-full flex items-center justify-center group-hover:bg-honey group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium tracking-wider uppercase">
                Nous contacter
              </span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-honey/10"
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <p className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-2">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-dark">{stat.label}</p>
              <p className="text-xs text-dark/50">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
