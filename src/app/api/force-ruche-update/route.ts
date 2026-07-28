// app/api/force-ruche-update/route.ts
import { NextResponse } from "next/server";
import { awardOrderToRuche } from "@/lib/ruche";

export async function POST(request: Request) {
  try {
    const { uid } = await request.json();
    
    if (!uid) {
      return NextResponse.json({ error: "UID manquant" }, { status: 400 });
    }

    console.log("🔄 Force update pour uid:", uid);
    const result = await awardOrderToRuche(uid, 0);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("❌ Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}