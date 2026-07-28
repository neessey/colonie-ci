/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/audit-log.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function logAdminAction(
  uid: string,
  action: string,
  details: any
) {
  try {
    await setDoc(doc(db, "admin_audit", `${Date.now()}_${uid}`), {
      uid,
      action,
      details,
      timestamp: serverTimestamp(),
      ip: typeof window !== 'undefined' ? 'client' : 'server',
    });
  } catch (error) {
    console.error("❌ Erreur audit log:", error);
  }
}