/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/check-admin/route.ts
import { NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
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

    const { auth } = initAdmin();
    
    // ✅ Vérifier le token
    const decodedToken = await auth.verifyIdToken(token);
    
    // ✅ Vérifier que le token n'est pas expiré
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return NextResponse.json({ 
        isAdmin: false, 
        error: "Token expiré" 
      }, { status: 401 });
    }
    
    const isAdmin = decodedToken.admin === true;

    return NextResponse.json({ 
      isAdmin,
      uid: decodedToken.uid,
      email: decodedToken.email,
      exp: decodedToken.exp,
    });
  } catch (error: any) {
    console.error("❌ Erreur check-admin:", error);
    
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json({ 
        isAdmin: false, 
        error: "Token expiré" 
      }, { status: 401 });
    }
    
    if (error.code === 'auth/argument-error') {
      return NextResponse.json({ 
        isAdmin: false, 
        error: "Token invalide" 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      isAdmin: false, 
      error: "Erreur serveur" 
    }, { status: 500 });
  }
}