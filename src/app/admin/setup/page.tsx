// app/admin/setup/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

export default function AdminSetupPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSetAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/set-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: data.message || "✅ Admin configuré avec succès !", type: 'success' });
        setEmail('');
      } else {
        setMessage({ text: data.error || "❌ Erreur lors de la configuration", type: 'error' });
      }
    } catch (error) {
      setMessage({ text: "❌ Erreur lors de la configuration", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-40 pb-20">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h1 className="text-2xl font-serif text-gray-800 mb-2">
              🛠️ Configuration Admin
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Définir un utilisateur comme administrateur pour accéder au dashboard.
            </p>

            <form onSubmit={handleSetAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de l&apos;administrateur
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@colonie.ci"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                />
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Configuration en cours..." : "✅ Définir comme admin"}
              </button>
            </form>

            <div className="mt-4 text-xs text-gray-400">
              ⚠️ L&apos;utilisateur doit déjà exister dans Firebase Authentication.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}