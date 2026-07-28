// components/admin/withAdminAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function withAdminAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAdminAuthComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const checkAdmin = async () => {
        if (!user) {
          router.push('/admin/login');
          setChecking(false);
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
            setIsAdmin(true);
          } else {
            router.push('/admin/login');
          }
        } catch (error) {
          console.error("❌ Erreur vérification admin:", error);
          router.push('/admin/login');
        } finally {
          setChecking(false);
        }
      };

      if (!loading) {
        checkAdmin();
      }
    }, [user, loading, router]);

    if (loading || checking) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-bounce">🐝</div>
            <p className="text-gray-500">Vérification des droits...</p>
          </div>
        </div>
      );
    }

    if (!isAdmin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}