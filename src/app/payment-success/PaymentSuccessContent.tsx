"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Header />

      <div className="bg-dark-100 min-h-screen pt-40 pb-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-cream-100 mb-4">
            Paiement réussi !
          </h1>

          <p className="text-cream-200/80 mb-8">
            Merci pour votre commande. Vous allez recevoir un email de confirmation.
          </p>

          <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10 mb-8">
            <p className="text-sm text-cream-200/60 mb-2">
              Référence de transaction
            </p>
            <p className="text-cream-100 font-mono text-sm">
              {paymentIntent}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-honey text-dark rounded-full font-medium hover:bg-honey-light transition-colors"
            >
              Continuer mes achats
            </Link>

            <br />

            <Link
              href="/"
              className="inline-block text-honey hover:text-honey-light transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}