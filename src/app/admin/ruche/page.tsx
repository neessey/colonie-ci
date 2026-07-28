"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getRucheProgress } from "@/lib/ruche";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  ruche: {
    ordersCount: number;
    rewardsClaimed: string[];
  };
  rewardsStatus?: {
    milestone6?: { claimed: boolean; date?: string };
    milestone12?: { claimed: boolean; date?: string };
    milestone18?: { claimed: boolean; date?: string };
    milestone24?: { claimed: boolean; date?: string };
  };
}

export default function AdminRuchePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }
      try {
        const token = await user.getIdToken();
        const response = await fetch('/api/check-admin', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.isAdmin) {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error("❌ Erreur vérification admin:", error);
        router.push('/');
      } finally {
        setCheckingAdmin(false);
      }
    };
    if (!authLoading) checkAdmin();
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData: User[] = [];
        querySnapshot.forEach((doc) => {
          userData.push({ uid: doc.id, ...doc.data() } as User);
        });
        userData.sort((a, b) => (b.ruche?.ordersCount || 0) - (a.ruche?.ordersCount || 0));
        setUsers(userData);
      } catch (error) {
        console.error("❌ Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isAdmin]);

  const getMilestoneStatus = (ordersCount: number) => {
    const milestones = [
      { threshold: 6, label: "Moitié de ruche", icon: "🌟", reward: "Livraison offerte" },
      { threshold: 12, label: "Ruche pleine", icon: "🏆", reward: "Coffret découverte" },
      { threshold: 18, label: "2ème ruche", icon: "👑", reward: "-10% sur une commande" },
      { threshold: 24, label: "2 ruches pleines", icon: "✨", reward: "Coffret découverte + -10%" },
    ];
    const reached = milestones.filter(m => ordersCount >= m.threshold);
    const next = milestones.find(m => ordersCount < m.threshold);
    return { reached, next };
  };

  const markRewardAsSent = async (uid: string, milestone: number) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        [`rewardsStatus.milestone${milestone}`]: {
          claimed: true,
          date: new Date().toISOString(),
        },
      });
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData: User[] = [];
      querySnapshot.forEach((doc) => {
        userData.push({ uid: doc.id, ...doc.data() } as User);
      });
      userData.sort((a, b) => (b.ruche?.ordersCount || 0) - (a.ruche?.ordersCount || 0));
      setUsers(userData);
      alert(`✅ Récompense marquée comme envoyée !`);
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  const handleNotifySeller = async (user: User, milestone: number) => {
    try {
      const response = await fetch('/api/notify-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          milestone: milestone,
          ordersCount: user.ruche?.ordersCount || 0,
        }),
      });
      if (response.ok) {
        alert(`📱 Notification WhatsApp envoyée au vendeur pour ${user.firstName}!`);
      } else {
        alert("❌ Erreur lors de l'envoi WhatsApp");
      }
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("❌ Erreur lors de l'envoi WhatsApp");
    }
  };

  const filteredUsers = users.filter(user => {
    const orders = user.ruche?.ordersCount || 0;
    const matchFilter = filter === "all" || orders >= parseInt(filter);
    const matchSearch =
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (checkingAdmin || authLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-cream-100 pt-40 text-center text-dark/40 font-serif text-lg">
          Vérification des droits...
        </div>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-cream-100 pt-40 text-center px-6">
          <div className="max-w-md mx-auto bg-white rounded-2xl p-10 border border-honey/10 shadow-lg">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-serif text-dark mb-2">Accès refusé</h2>
            <p className="text-dark/50">
              Vous n&apos;avez pas les droits pour accéder à cette page.
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-3 bg-honey text-white font-medium rounded-full hover:bg-honey-dark transition-colors"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-cream-100 pt-40 text-center text-dark/40 font-serif text-lg">
          Chargement des données...
        </div>
      </>
    );
  }

  const totalOrders = users.reduce((acc, u) => acc + (u.ruche?.ordersCount || 0), 0);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cream-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-8 border-b border-honey/15">
            <div>
              <p className="text-honey text-xs tracking-[0.3em] uppercase mb-3">Espace Administration</p>
              <h1 className="text-4xl md:text-5xl font-serif text-dark leading-tight">
                🐝 Gestion des <span className="text-gradient">Ruches</span>
              </h1>
              <p className="text-dark/50 mt-3">
                {users.length} client{users.length > 1 ? "s" : ""} inscrit{users.length > 1 ? "s" : ""} · {totalOrders} commande{totalOrders > 1 ? "s" : ""} au total
              </p>
            </div>
            <button
              onClick={async () => {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, "users"));
                const userData: User[] = [];
                querySnapshot.forEach((doc) => {
                  userData.push({ uid: doc.id, ...doc.data() } as User);
                });
                userData.sort((a, b) => (b.ruche?.ordersCount || 0) - (a.ruche?.ordersCount || 0));
                setUsers(userData);
                setLoading(false);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-honey/15 text-dark rounded-full hover:border-honey/40 hover:text-honey-dark transition-colors text-sm font-medium shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualiser
            </button>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { value: users.filter(u => (u.ruche?.ordersCount || 0) >= 6).length, label: "Moitié de ruche" },
              { value: users.filter(u => (u.ruche?.ordersCount || 0) >= 12).length, label: "Ruche pleine" },
              { value: users.filter(u => (u.ruche?.ordersCount || 0) >= 18).length, label: "2ème ruche"},
              { value: users.filter(u => (u.ruche?.ordersCount || 0) >= 24).length, label: "2 ruches pleines" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 border border-honey/10 text-center hover:border-honey/30 transition-colors shadow-sm"
              >
                <p className="text-3xl font-serif text-honey-dark">{stat.value}</p>
                <p className="text-xs text-dark/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "Tous" },
                { key: "6", label: "6+" },
                { key: "12", label: "12+" },
                { key: "18", label: "18+" },
                { key: "24", label: "24+" },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    filter === f.key
                      ? "bg-honey text-white border-honey"
                      : "bg-white text-dark/60 border-honey/10 hover:border-honey/30 hover:text-dark"
                  }`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex-1 min-w-[220px] relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-honey/10 rounded-full text-dark placeholder:text-dark/30 focus:border-honey focus:outline-none text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Liste des clients */}
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="bg-white rounded-2xl border border-honey/10 py-16 text-center text-dark/40">
                Aucun client trouvé
              </div>
            ) : (
              filteredUsers.map((user) => {
                const progress = getRucheProgress(user.ruche?.ordersCount || 0);
                const { reached, next } = getMilestoneStatus(user.ruche?.ordersCount || 0);
                const hasReward = reached.length > 0;
                const progressPercentage = progress.total > 0 ? Math.round((progress.filled / progress.total) * 100) : 0;
                const pendingRewards = reached.filter(
                  (m) => !user.rewardsStatus?.[`milestone${m.threshold}` as keyof typeof user.rewardsStatus]?.claimed
                );

                return (
                  <div
                    key={user.uid}
                    className={`bg-white rounded-2xl p-6 border shadow-sm transition-colors ${
                      pendingRewards.length > 0
                        ? "border-honey/40 shadow-[0_0_0_1px_rgba(245,166,35,0.15)]"
                        : "border-honey/10 hover:border-honey/25"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-6">

                      {/* Identité + niveau */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-lg font-serif text-dark">
                            {user.firstName} {user.lastName}
                          </p>
                          <span className="text-base">{progress.level.icon}</span>
                          <span className="text-[11px] tracking-wide uppercase text-honey-dark bg-honey/10 px-2 py-0.5 rounded-full">
                            {progress.level.name}
                          </span>
                        </div>
                        <p className="text-sm text-dark/40 mt-0.5">{user.email}</p>
                      </div>

                      {/* Commandes */}
                      <div className="text-center min-w-[70px]">
                        <p className="text-2xl font-serif text-dark">{user.ruche?.ordersCount || 0}</p>
                        <p className="text-[11px] text-dark/40 uppercase tracking-wide">Commandes</p>
                      </div>

                      {/* Progression */}
                      <div className="flex-1 min-w-[160px]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-dark/50">Progression</span>
                          <span className="text-xs font-medium text-honey-dark">{progressPercentage}%</span>
                        </div>
                        <div className="bg-cream-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-honey/70 to-honey rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-dark/40 mt-1.5">
                          {progress.filled}/{progress.total} alvéoles
                          {next && ` · prochain palier : ${next.threshold}`}
                        </p>
                      </div>

                      {/* Récompenses */}
                      <div className="min-w-[110px]">
                        {hasReward ? (
                          <div className="flex flex-wrap gap-1.5">
                            {reached.map((m, i) => {
                              const isClaimed = user.rewardsStatus?.[`milestone${m.threshold}` as keyof typeof user.rewardsStatus]?.claimed;
                              return (
                                <span
                                  key={i}
                                  className={`text-xs px-2.5 py-1 rounded-full border ${
                                    isClaimed
                                      ? "bg-green-50 text-green-600 border-green-200"
                                      : "bg-honey/10 text-honey-dark border-honey/20"
                                  }`}
                                >
                                  {m.icon} {isClaimed ? "✓" : "en attente"}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-xs text-dark/30">Aucune récompense</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        {pendingRewards.map((m) => (
                          <button
                            key={m.threshold}
                            className="px-4 py-2 bg-honey text-white text-sm font-medium rounded-full hover:bg-honey-dark transition-colors whitespace-nowrap shadow-sm"
                            onClick={() => {
                              if (confirm(`🎁 Préparer le cadeau pour ${user.firstName} (${m.label}) ?`)) {
                                markRewardAsSent(user.uid, m.threshold);
                                handleNotifySeller(user, m.threshold);
                              }
                            }}
                          >
                            📦 {m.label.split(" ")[0]}
                          </button>
                        ))}
                        {pendingRewards.length === 0 && (
                          <span className="text-sm text-dark/20 px-2">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pied de page */}
          <div className="mt-8 text-center text-xs text-dark/30">
            {filteredUsers.length} client{filteredUsers.length > 1 ? "s" : ""} affiché{filteredUsers.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </>
  );
}