"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import HiveGrid from "@/components/ruche/HiveGrid";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { awardOrderToRuche, getRucheProgress } from "@/lib/ruche";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { user, refreshProfile, profile } = useAuth();
  const paymentIntent = searchParams.get("payment_intent");
  const hasRun = useRef(false);
  const [rucheResult, setRucheResult] = useState<ReturnType<typeof getRucheProgress> | null>(null);
  const [beeArrived, setBeeArrived] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (hasRun.current || !user || !paymentIntent || isUpdating) return;
    hasRun.current = true;
    setIsUpdating(true);

    const finalize = async () => {
      try {
        // ✅ Récupérer l'ancien nombre de commandes
        const oldOrders = profile?.ruche?.ordersCount ?? 0;
        console.log("📊 Ancien nombre de commandes:", oldOrders);

        const result = await awardOrderToRuche(user.uid, 1);
        
        if (result) {
          console.log("✅ Ruche mise à jour !", result);
          setRucheResult(result);
          await refreshProfile();
          
          // ✅ Vérifier si on a atteint un palier (6, 12, 18, 24)
          const milestones = [6, 12, 18, 24];
          const newOrders = result.filled;
          
          // ✅ Si on vient d'atteindre un palier
          if (milestones.includes(newOrders) && oldOrders < newOrders) {
            // ✅ Message personnalisé selon le palier
            let message = "";
            let icon = "🎉";
            
            switch (newOrders) {
              case 6:
                message = "Félicitations ! Vous avez rempli la moitié de votre ruche ! 🐝";
                icon = "🌟";
                break;
              case 12:
                message = "🎊 VOTRE RUCHE EST PLEINE ! 🎊 Un coffret découverte vous attend ! 🎁";
                icon = "🏆";
                break;
              case 18:
                message = "Incroyable ! Vous avez rempli une 2ème ruche ! Vous êtes un(e) vrai(e) passionné(e) ! 🍯";
                icon = "👑";
                break;
              case 24:
                message = "🎉🎉 LÉGENDAIRE ! 24 commandes, 2 ruches pleines ! Vous êtes un(e) roi/roine du miel ! 🐝✨";
                icon = "👑";
                break;
            }
            
            // ✅ Afficher le pop-up
            toast.success(message, {
              duration: 8000,
              icon: icon,
              style: {
                background: '#1A1A1A',
                color: '#F5F0E8',
                border: '2px solid #F5A623',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
              },
            });
          }
          
          setTimeout(() => setBeeArrived(true), 400);
        } else {
          setError("Erreur lors de la mise à jour de votre ruche");
        }
      } catch (err) {
        console.error("❌ Erreur mise à jour Ruche:", err);
        setError("Erreur lors de la mise à jour de votre ruche");
      } finally {
        setIsUpdating(false);
        clearCart();
      }
    };

    finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, paymentIntent]);

  return (
    <>
      <Header />
         {/* ✅ Ajouter le Toaster pour les notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 6000,
          style: {
            background: '#1A1A1A',
            color: '#F5F0E8',
            border: '1px solid rgba(245,166,35,0.3)',
          },
        }}
      />
      <div className="bg-dark-100 min-h-screen pt-40 pb-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-cream-100 mb-4">Paiement réussi !</h1>
          <p className="text-cream-200/80 mb-8">
            Merci pour votre commande. Vous allez recevoir un email de confirmation.
          </p>

          {rucheResult && (
            <div className="bg-dark-50 rounded-2xl p-6 border border-honey/20 mb-8">
              <p className={`text-honey text-sm mb-4 transition-opacity duration-500 ${beeArrived ? "opacity-100" : "opacity-0"}`}>
                🐝 Une abeille arrive... votre ruche grandit !
              </p>
              <HiveGrid
                filled={rucheResult.filled}
                total={rucheResult.total}
                justFilledAnimation={beeArrived}
              />
              <p className="mt-4 text-cream-100 font-medium">
                {rucheResult.filled} / {rucheResult.total} alvéoles
              </p>
              {rucheResult.ordersUntilNextMilestone === 0 ? (
                <p className="mt-2 text-honey text-sm">🎁 Une récompense vous attend !</p>
              ) : (
                <p className="mt-2 text-cream-200/60 text-sm">
                  Plus que {rucheResult.ordersUntilNextMilestone} commande{rucheResult.ordersUntilNextMilestone > 1 ? "s" : ""} avant votre cadeau.
                </p>
              )}
            </div>
          )}

          <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10 mb-8">
            <p className="text-sm text-cream-200/60 mb-2">Référence de transaction</p>
            <p className="text-cream-100 font-mono text-sm">{paymentIntent}</p>
          </div>

          <div className="space-y-4">
            <Link href="/products" className="inline-block px-8 py-3 bg-honey text-dark rounded-full font-medium hover:bg-honey-light transition-colors">
              Continuer mes achats
            </Link>
            <br />
            <Link href="/" className="inline-block text-honey hover:text-honey-light transition-colors">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}