/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { initAdmin } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 });
    }

    const { auth } = initAdmin();
    
    // ✅ Vérifier le token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // ✅ Vérifier si admin
    if (!decodedToken.admin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // ✅ Créer une session sécurisée
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 7, // 7 jours
    });

    // ✅ Définir le cookie HTTP-Only
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    return NextResponse.json({ 
      success: true, 
      message: "Session créée" 
    });
  } catch (error: any) {
    console.error("❌ Erreur création session:", error);
    return NextResponse.json({ 
      error: error.message || "Erreur serveur" 
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}