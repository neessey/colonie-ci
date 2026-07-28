/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import AuthStep from "./AuthStep";
import { getRucheProgress } from "@/lib/ruche";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({
  initialData,
}: {
  initialData: { firstName: string; lastName: string; email: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    email: initialData.email,
    phone: "",
    address: "",
    city: "Abidjan",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message ?? "Erreur de validation");
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
                city: formData.city,
                country: "CI",
              },
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "Une erreur est survenue");
      }
    } catch (err) {
      setErrorMessage("Erreur lors du traitement du paiement");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10">
        <h3 className="text-lg font-serif text-cream-100 mb-4">Informations de livraison</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Prénom *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Nom *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Téléphone *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-cream-200/60 mb-1">Adresse *</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Ville *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            >
              <option value="Abidjan">Abidjan</option>
              <option value="Bouaké">Bouaké</option>
              <option value="Yamoussoukro">Yamoussoukro</option>
              <option value="San Pedro">San Pedro</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-cream-200/60 mb-1">Notes de commande (optionnel)</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10">
        <h3 className="text-lg font-serif text-cream-100 mb-4">Paiement</h3>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
      {(() => {
        const { user, profile } = useAuth();
        if (!user || !profile) return null;
        const next = getRucheProgress((profile.ruche?.ordersCount ?? 0) + 1);
        return (
          <div className="bg-honey/10 border border-honey/30 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🐝</span>
            <p className="text-sm text-cream-100">
              Cette commande remplira <span className="text-honey font-medium">+1 alvéole</span> —
              votre ruche passera à <span className="text-honey font-medium">{next.filled}/{next.total}</span>
            </p>
          </div>
        );
      })()}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-honey text-dark font-medium rounded-full hover:bg-honey-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Traitement en cours..." : `Payer ${getTotalPrice().toLocaleString()} FCFA`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalPriceFormatted } = useCart();
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [authStepDone, setAuthStepDone] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/products");
      return;
    }

    const createPaymentIntent = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getTotalPrice(),
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [items, router, getTotalPrice]);

  // Si déjà connecté, on saute l'étape de choix
  useEffect(() => {
    if (!authLoading && user) {
      setAuthStepDone(true);
    }
  }, [authLoading, user]);

  if (items.length === 0) return null;

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimary: "#F5A623",
      colorBackground: "#1A1A1A",
      colorText: "#F5F0E8",
      colorDanger: "#ef4444",
      fontFamily: "system-ui, -apple-system, sans-serif",
      borderRadius: "12px",
    },
  };

  const initialData = {
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    email: profile?.email ?? "",
  };

  return (
    <>
      <Header />
      <div className="bg-dark-100 min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-cream-100 mb-2">Finaliser ma commande</h1>
            <p className="text-cream-200/60">
              {authStepDone
                ? "Veuillez remplir vos informations pour procéder au paiement"
                : "Comment souhaitez-vous continuer ?"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!authStepDone ? (
                <AuthStep onContinue={() => setAuthStepDone(true)} />
              ) : (
                clientSecret && (
                  <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret, appearance }}>
                    <CheckoutForm initialData={initialData} />
                  </Elements>
                )
              )}
            </div>

            <div>
              <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10 sticky top-32">
                <h3 className="text-lg font-serif text-cream-100 mb-4">Récapitulatif</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-cream-200/80">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-cream-100">
                        {(item.price * item.quantity).toLocaleString()} FCFA
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-cream-100/10 pt-4 mb-4">
                  <div className="flex justify-between font-medium">
                    <span className="text-cream-100">Total</span>
                    <span className="text-honey text-xl">{getTotalPriceFormatted()}</span>
                  </div>
                </div>
                <div className="text-xs text-cream-200/40 text-center">
                  Livraison gratuite à Abidjan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}