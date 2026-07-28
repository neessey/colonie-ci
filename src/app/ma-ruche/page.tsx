"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HiveGrid from "@/components/ruche/HiveGrid";
import { useAuth } from "@/context/AuthContext";
import { getRucheProgress } from "@/lib/ruche";

export default function MaRuchePage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
// Dans MaRuchePage.tsx, ajoute ce bouton :

const handleForceUpdate = async () => {
  try {
    setRefreshing(true);
    // ✅ Appeler une API pour forcer la mise à jour
    const response = await fetch("/api/force-ruche-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: user?.uid }),
    });
    const result = await response.json();
    console.log("📊 Force update result:", result);
    await refreshProfile();
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    setRefreshing(false);
  }
};

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [loading, user, router]);

  // ✅ Rafraîchir automatiquement quand la page se charge
  useEffect(() => {
    if (user) {
      const refresh = async () => {
        setRefreshing(true);
        await refreshProfile();
        setRefreshing(false);
      };
      refresh();
    }
  }, [user, refreshProfile]);

  if (loading || !profile) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-dark-100 pt-40 text-center text-cream-200/60">Chargement...</div>
      </>
    );
  }

  

  const progress = getRucheProgress(profile.ruche?.ordersCount ?? 0);

  return (
    <>
      <Header />
      <div className="bg-dark-100 min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-serif text-cream-100">
              Bonjour {profile.firstName} 👋
            </h1>
           
            
          </div>
          <p className="text-cream-200/60 mb-12">Voici l&apos;état de votre ruche.</p>

          <div className="bg-dark-50 rounded-2xl p-8 border border-honey/20 text-center mb-8">
            <p className="text-honey text-sm tracking-[0.2em] uppercase mb-1">
              {progress.level.icon} {progress.level.name}
            </p>
            <h2 className="text-2xl font-serif text-cream-100 mb-8">Votre Ruche</h2>

            <HiveGrid filled={progress.filled} total={progress.total} />

            <p className="mt-8 text-cream-100 font-medium">
              {progress.filled} / {progress.total} alvéoles remplies
            </p>
            <p className="text-cream-200/60 text-sm mt-1">
              {progress.ordersUntilNextMilestone > 0
                ? `Encore ${progress.ordersUntilNextMilestone} commande${progress.ordersUntilNextMilestone > 1 ? "s" : ""} avant votre récompense.`
                : "🎉 Récompense disponible !"}
            </p>
          </div>

          <div id="recompenses" className="bg-dark-50 rounded-2xl p-8 border border-cream-100/10 scroll-mt-32">
            <h3 className="text-xl font-serif text-cream-100 mb-6">Vos récompenses</h3>
            <div className="space-y-4">
              {progress.milestones.map((m) => (
                <div
                  key={m.threshold}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    m.reached
                      ? "bg-honey/10 border-honey/30"
                      : "bg-dark-100 border-cream-100/10 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.reward.icon}</span>
                    <div>
                      <p className="text-cream-100 font-medium">{m.reward.label}</p>
                      <p className="text-xs text-cream-200/50">À {m.threshold} commandes</p>
                    </div>
                  </div>
                  {m.reached ? (
                    <span className="text-xs bg-honey text-dark font-medium px-3 py-1 rounded-full">
                      Débloqué
                    </span>
                  ) : (
                    <span className="text-xs text-cream-200/40">Verrouillé</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* ✅ Bouton pour forcer le rafraîchissement */}
          <div className="mt-8 text-center">
            <button
              onClick={async () => {
                setRefreshing(true);
                await refreshProfile();
                setRefreshing(false);
              }}
              className="text-sm text-cream-200/40 hover:text-cream-100 transition-colors"
            >
              🔄 Rafraîchir la ruche
            </button>
          </div>
        </div>
      </div>
    </>
  );
}