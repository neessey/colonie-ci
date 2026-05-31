"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Miel & Gimgembre",
    description: "Un miel aux notes de gimgembre, récolté dans les savanes ivoiriennes.",
    weight: "360g",
    price: "6 000 FCFA",
    image: "/m&g.png",
    badge: "Best-seller",
  },
  {
    id: 2,
    name: "Mini Pots de Miel",
    description: "Des pots compacts pour savourer le goût du miel à tout moment.",
    weight: "125g",
    price: "2 000 FCFA",
    image: "/mini-pots.png",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Cuillères de Miel de Fleurs",
    description: "Des cuillères pré-remplies de miel de fleurs, prêtes à être dégustées instantanément, partout et à tout moment.",
    weight: "250g",
    price: "5 000 FCFA",
    image: "/cuilleres.png",
    badge: "Édition limitée",
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="produits"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-dark-100 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="hexagon-pattern h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-honey text-sm tracking-[0.3em] uppercase mb-4">
            Nos Produits
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream-100 leading-tight">
            Un nouveau format
            <br />
            <span className="text-gradient">premium</span>
          </h2>
        </div>

        {/* Product Description */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg md:text-xl text-cream-200/80 leading-relaxed">
            Colonie n&apos;est pas seulement une nouvelle génération de miel, mais aussi une déclaration forte en faveur de l&apos;apiculture durable et du savoir-faire ivoirien.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-dark-50/50 rounded-2xl overflow-hidden border border-cream-100/10 hover:border-honey/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-honey text-dark text-xs font-medium px-3 py-1 rounded-full">
                  {product.badge}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-serif text-cream-100 mb-2">
                  {product.name}
                </h3>
                <p className="text-cream-200/60 text-sm md:text-base mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cream-200/40 text-xs">{product.weight}</p>
                    <p className="text-honey text-lg font-medium">{product.price}</p>
                  </div>
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-honey/30 text-honey hover:bg-honey hover:text-dark transition-all duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-honey text-dark rounded-full font-medium hover:bg-honey-light transition-colors"
          >
            Commander maintenant
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      </div>
    </section>
  );
}
