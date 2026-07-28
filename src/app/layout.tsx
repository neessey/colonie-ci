import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Colonie.ci | Miel Premium de Côte d'Ivoire",
  description: "Colonie.ci - Production et valorisation du miel ivoirien de qualité supérieure. Miel naturel, sain et respectueux de l'environnement.",
  keywords: ["miel", "Côte d'Ivoire", "Abidjan", "apiculture", "miel naturel", "miel premium", "Colonie"],
  openGraph: {
    title: "Colonie.ci | Miel Premium de Côte d'Ivoire",
    description: "Production et valorisation du miel ivoirien de qualité supérieure",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
