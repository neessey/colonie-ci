/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminLoginPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  // ✅ Vérifier si l'utilisateur est admin APRÈS le rendu
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch('/api/check-admin', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.isAdmin) {
          router.push("/admin/ruche");
        } else {
          // ❌ Pas admin, déconnecter
          await logout();
          setError("❌ Vous n'avez pas les droits d'administrateur.");
        }
      } catch (error) {
        console.error("❌ Erreur vérification admin:", error);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, router, logout]);

  // ✅ Afficher un écran de chargement pendant la vérification
  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Vérification en cours...</p>
        </div>
      </div>
    );
  }

  // ✅ Si déjà connecté et admin, ne pas afficher le formulaire
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-gray-500">Redirection vers le dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      // ✅ La vérification admin se fera dans le useEffect
    } catch (error: any) {
      setError(error.message || "Email ou mot de passe incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐝</div>
          <h1 className="text-3xl font-serif text-gray-800">Administration</h1>
          <p className="text-gray-500 mt-2">Connectez-vous pour gérer les ruches</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@colonie.ci"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Connexion..." : "🔐 Se connecter"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}