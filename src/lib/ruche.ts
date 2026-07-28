import { doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface RucheData {
  ordersCount: number;
  rewardsClaimed: string[];
}

export const REWARD_TIERS = [
  { icon: "🚚", label: "Livraison offerte" },
  { icon: "🍯", label: "Pot de miel offert" },
  { icon: "🎟️", label: "-10% sur une commande" },
  { icon: "🎁", label: "Coffret découverte" },
];

export const RUCHE_LEVELS = [
  { name: "Petit Nid", icon: "🪹" },
  { name: "Ruche Naissante", icon: "🐝" },
  { name: "Ruche Active", icon: "🍯" },
  { name: "Grande Ruche", icon: "👑" },
];
const GOLDEN_LEVEL = { name: "Ruche Dorée", icon: "✨" };

const CYCLE_LENGTH = 12;

export function getRucheProgress(ordersCount: number) {
  const cycleIndex = ordersCount === 0 ? 0 : Math.floor((ordersCount - 1) / CYCLE_LENGTH);
  const filled = ordersCount === 0 ? 0 : ordersCount - cycleIndex * CYCLE_LENGTH;

  const level = RUCHE_LEVELS[Math.min(cycleIndex, RUCHE_LEVELS.length - 1)] ?? GOLDEN_LEVEL;
  const isGolden = cycleIndex >= RUCHE_LEVELS.length;

  const midThreshold = cycleIndex * CYCLE_LENGTH + CYCLE_LENGTH / 2;
  const endThreshold = cycleIndex * CYCLE_LENGTH + CYCLE_LENGTH;

  const rewardFor = (absoluteThreshold: number) => {
    const idx = (absoluteThreshold / 6 - 1) % REWARD_TIERS.length;
    return REWARD_TIERS[idx];
  };

  return {
    cycleIndex,
    filled,
    total: CYCLE_LENGTH,
    level: isGolden ? GOLDEN_LEVEL : level,
    cyclesCompleted: cycleIndex,
    isGolden,
    milestones: [
      { threshold: midThreshold, reward: rewardFor(midThreshold), reached: ordersCount >= midThreshold },
      { threshold: endThreshold, reward: rewardFor(endThreshold), reached: ordersCount >= endThreshold },
    ],
    ordersUntilNextMilestone:
      ordersCount >= midThreshold && ordersCount < endThreshold
        ? endThreshold - ordersCount
        : Math.max(midThreshold - ordersCount, 0),
  };
}

export async function initRucheData(uid: string) {
  console.log("🔧 Initialisation de la ruche pour l'utilisateur:", uid);
  await setDoc(doc(db, "users", uid), { ruche: { ordersCount: 0, rewardsClaimed: [] } }, { merge: true });
}

export async function awardOrderToRuche(uid: string, total: number) {
  console.log("🐝 awardOrderToRuche appelé pour uid:", uid);
  console.log("📦 Total de la commande:", total);
  
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) {
      console.error("❌ Utilisateur non trouvé dans Firestore");
      // ✅ Créer la ruche si elle n'existe pas
      await initRucheData(uid);
      return await awardOrderToRuche(uid, total);
    }

    const data = snap.data();
    console.log("📄 Données utilisateur avant mise à jour:", data);
    console.log("📊 ordersCount actuel:", data?.ruche?.ordersCount);

    // ✅ Incrémenter ordersCount
    await updateDoc(userRef, { "ruche.ordersCount": increment(1) });
    console.log("✅ ordersCount incrémenté de 1");

    // ✅ Récupérer les nouvelles données
    const updatedSnap = await getDoc(userRef);
    const updatedData = updatedSnap.data();
    const newOrdersCount = updatedData?.ruche?.ordersCount ?? 0;
    console.log("📊 Nouveau nombre de commandes:", newOrdersCount);

    const progress = getRucheProgress(newOrdersCount);
    console.log("🐝 Progression de la ruche:", progress);

    return progress;
  } catch (error) {
    console.error("❌ Erreur dans awardOrderToRuche:", error);
    throw error;
  }
}

// ✅ Nouvelle fonction pour forcer la mise à jour manuelle
export async function forceUpdateRuche(uid: string) {
  console.log("🔄 Force update de la ruche pour:", uid);
  return await awardOrderToRuche(uid, 0);
}