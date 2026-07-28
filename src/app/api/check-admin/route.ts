/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/check-admin/route.ts
import { NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
    // ✅ Récupérer le token depuis l'en-tête
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ 
        isAdmin: false, 
        error: "Non authentifié" 
      }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ 
        isAdmin: false, 
        error: "Token manquant" 
      }, { status: 401 });
    }

    // ✅ Initialiser Firebase Admin
    const { auth } = initAdmin();
    
    // ✅ Vérifier le token
    const decodedToken = await auth.verifyIdToken(token);
    const isAdmin = decodedToken.admin === true;

    return NextResponse.json({ 
      isAdmin,
      uid: decodedToken.uid,
      email: decodedToken.email,
    });
  } catch (error: any) {
    console.error("❌ Erreur check-admin:", error);
    
    // ✅ Gérer les erreurs spécifiques
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json({ 
        isAdmin: false, 
        error: "Token expiré" 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      isAdmin: false, 
      error: error.message || "Erreur serveur" 
    }, { status: 500 });
  }
}