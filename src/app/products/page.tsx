/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext"; // Ajout de l'import

const products = [
  {
    id: 1,
    name: "Sticks de Miel Gimgembre",
    description: "Un miel aux notes de gimgembre, récolté dans les savanes ivoiriennes. Parfait pour soulager les maux de gorge et réveiller vos papilles.",
    longDescription: "Notre Miel au Gingembre est une fusion parfaite entre la douceur du miel pur et la puissance du gingembre frais. Récolté dans les savanes ivoiriennes, ce miel artisanal est idéal pour :\n• Soulager naturellement les maux de gorge\n• Booster votre système immunitaire\n• Réveiller vos papilles avec des notes épicées\n• Accompagner vos tisanes et infusions",
    weight: "30x12g",
    price: "6 000 FCFA",
    image: "/sticks-ging.jpg",
    badge: "Best-seller",
    category: "Miels aromatisés",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Antioxydant", "Anti-inflammatoire", "Boost immunitaire"],
  },
  {
    id: 2,
    name: "Mini Pots de Miel",
    description: "Des pots compacts pour savourer le goût du miel à tout moment. Idéal pour les voyages ou les bureaux.",
    longDescription: "Nos Mini Pots de Miel sont la solution parfaite pour emporter votre dose de douceur partout avec vous. Pratiques et élégants, ils contiennent du miel pur à 100%.\n\nParfaits pour :\n• Emporter au bureau ou en voyage\n• Offrir en cadeau d'affaires\n• Découvrir notre miel avant d'acheter en grand format\n• Avoir toujours du miel à portée de main",
    weight: "125g",
    price: "2 000 FCFA",
    image: "/pots-miel.jpg",
    badge: "Premium",
    category: "Formats pratiques",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Pratique", "Nomade", "Anti-gaspi"],
  },
  {
    id: 3,
    name: "Cuillères de Miel de Fleurs",
    description: "Des cuillères pré-remplies de miel de fleurs, prêtes à être dégustées instantanément, partout et à tout moment.",
    longDescription: "Nos Cuillères de Miel de Fleurs révolutionnent la façon de consommer le miel. Chaque cuillère contient une dose parfaite de miel pur, conditionnée pour préserver toutes ses qualités.\n\nUtilisations :\n• À déguster nature comme snack sain\n• À diluer dans une tasse de thé ou café\n• À étaler sur une tartine\n• Parfait pour les buffets d'entreprise",
    weight: "25x10g (12 cuillères)",
    price: "5 000 FCFA",
    image: "/cuilleres1.jpg",
    badge: "Édition limitée",
    category: "Innovation",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Pratique", "Dose parfaite", "Hygiénique"],
  },
  {
    id: 4,
    name: "Miel de Fleurs ",
    description: "Un miel aux mille nuances, butiné par nos abeilles dans les forêts protégées de Côte d'Ivoire.",
    longDescription: "Ce miel d'exception est le reflet de la biodiversité ivoirienne. Récolté pendant la saison des pluies, il capture l'essence des fleurs sauvages et des arbres fruitiers.\n\nCaractéristiques :\n• Texture crémeuse et fondante\n• Notes florales et fruitées\n• Parfait pour les petits-déjeuners\n• Idéal pour les soins beauté maison",
    weight: "500g",
    price: "3 500 FCFA",
    image: "/fleurs.jpg",
    badge: "Naturel",
    category: "Miels purs",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Bio", "Local", "Artisanal"],
  },
  {
    id: 5,
    name: "Mini Pots de Miel Gingembre",
    description: "Découvrez toute la gamme Colonie avec ce coffret comprenant nos 3 miels signatures.",
    longDescription: "Le coffret découverte Colonie est le cadeau parfait pour les amateurs de miel ou pour ceux qui souhaitent découvrir notre univers. Ce coffret élégant contient :\n\n• 1 pot de Miel & Gingembre (125g)\n• 1 Mini Pot de Miel (125g)\n• 2 Cuillères de Miel de Fleurs\n\nLivré dans un écrin en carton recyclé avec une carte explicative sur nos méthodes de production.",
    weight: "50g total",
    price: "1 500 FCFA",
    image: "/pots-ging.jpg",
    badge: "Cadeau idéal",
    category: "Formats pratiques",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Cadeau", "Découverte", "Économique"],
  },
  {
    id: 6,
    name: "Sticks de Miel Nature",
    description: "Des sticks individuels de miel pur, parfaits pour les déplacements ou les pauses au bureau.",
    longDescription: "Notre Miel Crémeux à la Vanille est le résultat d'un mariage subtil entre notre miel d'acacia et de la vanille naturelle. Sa texture crémeuse et son goût délicat en font un produit d'exception.\n\nIdéal pour :\n• Napper vos fromages\n• Parfumer vos yaourts\n• Réaliser des desserts raffinés\n• Offrir à des connaisseurs",
    weight: "100x12g",
    price: "10 000 FCFA",
    image: "/sticks-miel.jpg",
    badge: "Premium",
    category: "Miels purs",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Onctueux", "Parfumé", "Raffiné"],
  },
  {
    id: 7,
    name: "Miel & Gimgembre",
    description: "Un miel aux notes de gimgembre, récolté dans les savanes ivoiriennes. Parfait pour soulager les maux de gorge et réveiller vos papilles.",
    longDescription: "Notre Miel au Gingembre est une fusion parfaite entre la douceur du miel pur et la puissance du gingembre frais. Récolté dans les savanes ivoiriennes, ce miel artisanal est idéal pour :\n• Soulager naturellement les maux de gorge\n• Booster votre système immunitaire\n• Réveiller vos papilles avec des notes épicées\n• Accompagner vos tisanes et infusions",
    weight: "500g",
    price: "4 500 FCFA",
    image: "/gingembre.jpeg",
    badge: "Best-seller",
    category: "Miels aromatisés",
    stock: true,
    origin: "Côte d'Ivoire",
    benefits: ["Antioxydant", "Anti-inflammatoire", "Boost immunitaire"],
  },
];

const categories = [
  "Tous",
  "Miels purs",
  "Miels aromatisés",
  "Formats pratiques",
  "Innovation",
];

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Utilisation du hook useCart
  const { addToCart } = useCart();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProducts = selectedCategory === "Tous"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    // Ajouter au panier via le context
    addToCart(product);
    
    // Afficher l'animation de confirmation
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <>
      <Header />
      <div className="bg-white-50/50 min-h-screen">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-dark-200 to-dark-100 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="hexagon-pattern h-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div
              className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm mb-6">
                <Link href="/" className="text-cream-200/60 hover:text-honey transition-colors">
                  Accueil
                </Link>
                <span className="text-cream-200/40">/</span>
                <span className="text-honey">Nos Produits</span>
              </div>

              <p className="text-honey text-sm tracking-[0.3em] uppercase mb-4">
                Découvrez notre collection
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-cream-100 leading-tight mb-6">
                Nos produits
                <br />
                <span className="text-gradient">authentiques</span>
              </h1>
              <p className="text-lg md:text-xl text-cream-200/80 max-w-3xl mx-auto">
                Découvrez notre gamme de miels d&apos;exception, récoltés avec passion
                dans les régions les plus préservées de Côte d&apos;Ivoire.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-12 md:py-20 ">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filters */}
            <div className="mb-12">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-between px-6 py-3 bg-dark-50 border border-cream-100/10 rounded-xl"
                >
                  <span className="text-cream-100">Catégorie : {selectedCategory}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isFilterOpen && (
                  <div className="mt-2 p-4 bg-dark-50 border border-cream-100/10 rounded-xl">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat
                          ? "bg-honey text-dark"
                          : "text-cream-200 hover:bg-cream-100/10"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center justify-center gap-4 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === cat
                      ? "bg-honey text-dark font-medium"
                      : "bg-dark-50 text-cream-200 hover:bg-cream-100/10"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`group bg-dark-100 rounded-2xl overflow-hidden border border-cream-100/10 hover:border-honey/30 transition-all duration-500 hover:transform hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-honey text-dark text-xs font-medium px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>

                    {/* Quick actions */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-honey text-dark hover:bg-honey-light transition-all duration-300"
                      >
                        {addedToCart === product.id ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-cream-200/40 text-xs uppercase tracking-wider mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-xl md:text-2xl font-serif text-cream-100 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-cream-200/60 text-sm mb-4 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Benefits */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.benefits.map((benefit, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-honey/10 text-honey rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-cream-100/10">
                      <div>
                        <p className="text-cream-200/40 text-xs">{product.weight}</p>
                        <p className="text-honey text-xl font-medium">{product.price}</p>
                      </div>
                      <Link
                        href={`/produits/${product.id}`}
                        className="px-4 py-2 rounded-full border border-honey/30 text-honey hover:bg-honey hover:text-dark transition-all duration-300 text-sm"
                      >
                        Détails
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-cream-200/60">Aucun produit dans cette catégorie.</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-honey/5 via-honey/10 to-honey/5 rounded-2xl p-8 md:p-12 border border-honey/20">
                <h3 className="text-2xl md:text-3xl font-serif text-cream-100 mb-4">
                  Vous cherchez un produit spécifique ?
                </h3>
                <p className="text-cream-200/80 mb-6">
                  Contactez-nous pour une commande personnalisée ou pour toute question sur nos produits.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-3 bg-honey text-dark rounded-full font-medium hover:bg-honey-light transition-colors"
                >
                  Nous contacter
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-honey/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-cream-100 font-semibold mb-2">Qualité garantie</h4>
                <p className="text-cream-200/60 text-sm">Miel 100% pur, sans additifs ni conservateurs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-honey/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="text-cream-100 font-semibold mb-2">Producteur local</h4>
                <p className="text-cream-200/60 text-sm">Soutien à l&apos;apiculture ivoirienne</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-honey/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-cream-100 font-semibold mb-2">Livraison rapide</h4>
                <p className="text-cream-200/60 text-sm">Expédition sous 24h à Abidjan</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}