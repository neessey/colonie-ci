/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/set-admin/route.ts
import { NextResponse } from "next/server";
import { setAdminRole } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    // ✅ Définir l'utilisateur comme admin
    await setAdminRole(email);
    
    return NextResponse.json({ 
      success: true, 
      message: `✅ ${email} est maintenant administrateur !` 
    });
  } catch (error: any) {
    console.error("❌ Erreur:", error);
    return NextResponse.json({ 
      error: error.message || "Erreur lors de la définition du rôle admin" 
    }, { status: 500 });
  }
}