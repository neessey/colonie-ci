"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-dark-100 text-cream-100 overflow-hidden">
      {/* CTA Section */}
      <div className="border-b border-cream-100/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
                Prêt à découvrir
                <br />
                <span className="text-gradient">l&apos;excellence ?</span>
              </h2>
              <p className="text-cream-200/60 text-lg max-w-md">
                Contactez-nous pour commander ou en savoir plus sur nos produits et notre démarche.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <a
                href="https://www.instagram.com/colonie.ci"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-honey text-dark rounded-full font-medium hover:bg-honey-light transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/Colonie.ci"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-cream-100/20 rounded-full font-medium hover:bg-cream-100/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-3xl font-serif font-semibold tracking-wide">
                COLONIE
              </h3>
            </Link>
            <p className="text-cream-200/60 leading-relaxed max-w-sm mb-6">
              Production et valorisation du miel ivoirien de qualité supérieure. Miel naturel, sain et respectueux de l&apos;environnement.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/colonie.ci"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-cream-100/20 rounded-full flex items-center justify-center hover:bg-honey hover:border-honey transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/Colonie.ci"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-cream-100/20 rounded-full flex items-center justify-center hover:bg-honey hover:border-honey transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-6 text-cream-200/80">
              Navigation
            </h4>
            <nav className="space-y-3">
              <Link href="#histoire" className="block text-cream-200/60 hover:text-honey transition-colors">
                Notre Histoire
              </Link>
              <Link href="#produits" className="block text-cream-200/60 hover:text-honey transition-colors">
                Nos Produits
              </Link>
              <Link href="#engagements" className="block text-cream-200/60 hover:text-honey transition-colors">
                Nos Engagements
              </Link>
              <Link href="#localisation" className="block text-cream-200/60 hover:text-honey transition-colors">
                Notre Terroir
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-6 text-cream-200/80">
              Contact
            </h4>
            <div className="space-y-3 text-cream-200/60">
              <p>Abidjan, Cocody</p>
              <p>Côte d&apos;Ivoire</p>
              <a href="mailto:colonieindustries@gmail.com" className="block hover:text-honey transition-colors">
                colonieindustries@gmail.com
              </a>
              <a href="tel:+22579264369" className="block hover:text-honey transition-colors">
                +225 79 26 43 69
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream-100/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream-200/40">
            2026 Colonie.ci - Tous droits réservés
          </p>
       
{/* ✅ Lien vers l'administration */}
<Link 
  href="/admin/login" 
  className="text-xs text-cream-200/30"
>
  Miel 100% naturel de Côte d&apos;Ivoire
</Link>
        </div>
      </div>
    </footer>
  );
}
