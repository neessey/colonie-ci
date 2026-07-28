"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface RucheData {
  points: number;
  ordersCount: number;
  badges: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  ruche: RucheData;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
  console.log("📥 Chargement du profil pour uid:", uid);
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
      const data = snap.data() as UserProfile;
      console.log("✅ Profil chargé:", data);
      console.log("📊 ordersCount:", data.ruche?.ordersCount);
      setProfile(data);
    } else {
      console.log("❌ Aucun document trouvé pour uid:", uid);
    }
  } catch (error) {
    console.error("❌ Erreur lors du chargement du profil:", error);
  }
};

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: `${firstName} ${lastName}` });

    const newProfile: UserProfile = {
      uid: cred.user.uid,
      email,
      firstName,
      lastName,
      ruche: { points: 0, ordersCount: 0, badges: [] },
    };

    await setDoc(doc(db, "users", cred.user.uid), {
      ...newProfile,
      createdAt: serverTimestamp(),
    });
    setProfile(newProfile);
  };

  const logout = async () => {
    await fbSignOut(auth);
  };

  const refreshProfile = async () => {
    if (user) await loadProfile(user.uid);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, login, signup, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}