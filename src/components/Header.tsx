"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import { usePathname } from "next/navigation";
import RucheWidget from "./ruche/RucheWidget";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = getTotalItems();

  // Détermine si on doit cacher le panier
  const hideCart = pathname === "/ma-ruche";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-cream-100/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-100 text-white rounded-full hover:bg-dark-50 transition-colors"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H17M1 7H17M1 13H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-medium hidden sm:block">Menu</span>
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide text-dark">
                COLONIE
              </h1>
            </Link>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              {/* Bouton Panier - Caché sur /ma-ruche */}
              {!hideCart && pathname !== "/" && pathname !== "/contact" && pathname !== "/admin/ruche" && pathname !== "/admin/setup" &&(
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center gap-2 px-4 py-2 bg-dark-100 text-white rounded-full hover:bg-dark-50 transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L5.5 19M17 13L18.5 19M9 21H11M15 21H17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-honey text-dark text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              {/* Nos Miels : PAS sur /products ET PAS sur /ma-ruche */}
              {pathname !== "/products" && (
                <Link
                  href="/products"
                  className="flex items-center gap-2 px-4 py-2 bg-honey text-white rounded-full hover:bg-honey-dark transition-colors"
                >
                  <span className="text-sm font-medium">Nos Miels</span>
                </Link>
              )}
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-honey/10">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/products"
                  className="text-2xl font-serif text-honey"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nos Produits
                </Link>
                <Link
                  href="/contact"
                  className="text-2xl font-serif text-honey"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <RucheWidget />
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer - Caché sur /ma-ruche */}
      {!hideCart && (
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}