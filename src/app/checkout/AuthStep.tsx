/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Mode = "choice" | "login" | "signup";

interface AuthStepProps {
  onContinue: () => void;
}

export default function AuthStep({ onContinue }: AuthStepProps) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("choice");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.email, form.password);
      onContinue();
    } catch (err: any) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(form.email, form.password, form.firstName, form.lastName);
      onContinue();
    } catch (err: any) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  if (mode === "choice") {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-honey/20 to-honey/5 border border-honey/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🐝</div>
            <div>
              <h3 className="text-lg font-serif text-cream-100 mb-1">Rejoignez La Ruche !</h3>
              <p className="text-sm text-cream-200/70 leading-relaxed">
                Créez un compte pour construire votre ruche, débloquer des cadeaux et suivre vos commandes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="w-full py-3 bg-honey text-dark font-medium rounded-full hover:bg-honey-light transition-colors"
          >
            Créer un compte en 30 secondes
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className="w-full py-3 border border-honey/30 text-cream-100 font-medium rounded-full hover:bg-honey/10 transition-colors"
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-3 text-cream-200/60 text-sm hover:text-cream-100 transition-colors"
          >
            Continuer en tant qu&apos;invité
          </button>
        </div>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10">
        <h3 className="text-lg font-serif text-cream-100 mb-4">Se connecter</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-honey text-dark font-medium rounded-full hover:bg-honey-light transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode("choice")}
          className="mt-4 text-sm text-cream-200/60 hover:text-cream-100"
        >
          ← Retour
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-50 rounded-xl p-6 border border-cream-100/10">
      <h3 className="text-lg font-serif text-cream-100 mb-4">Créer un compte</h3>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Prénom</label>
            <input
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-cream-200/60 mb-1">Nom</label>
            <input
              type="text"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-cream-200/60 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-cream-200/60 mb-1">Mot de passe (6 caractères min.)</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark-100 border border-cream-100/10 rounded-lg text-cream-100 focus:border-honey focus:outline-none"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-honey text-dark font-medium rounded-full hover:bg-honey-light transition-colors disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer ma Ruche 🐝"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setMode("choice")}
        className="mt-4 text-sm text-cream-200/60 hover:text-cream-100"
      >
        ← Retour
      </button>
    </div>
  );
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Cet email est déjà utilisé.";
    case "auth/invalid-email":
      return "Email invalide.";
    case "auth/weak-password":
      return "Mot de passe trop court (6 caractères min.).";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email ou mot de passe incorrect.";
    default:
      return "Une erreur est survenue. Réessayez.";
  }
}