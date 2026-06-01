import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// 🔁 Remplace par TON numéro WhatsApp au format international SANS le '+'
// Exemple: 2250700000000 (pour la Côte d'Ivoire)
const WHATSAPP_NUMBER = "2250504272827";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis" },
        { status: 400 }
      );
    }

    // Format du message WhatsApp
    const whatsappMessage = `
📩 *Nouveau message depuis colonie-ci.onrender.com*

👤 *Nom:* ${name}
📧 *Email:* ${email}
📞 *Téléphone:* ${phone || "Non renseigné"}

💬 *Message:* 
${message}

🔔 Répondez directement à ce message pour contacter le client.
    `.trim();

    // Envoi via l'API WhatsApp Business (ou CallMeBot / WhatsMate selon ton service)
    // Ici on utilise gratuitement CallMeBot (limité mais parfait pour test)
    // Documentation: https://www.callmebot.com/blog/free-api-whatsapp-messages/
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      whatsappMessage
    )}&apikey=VOTRE_API_KEY`;

    // ⚠️ Remplace par ton système préféré:
    // - WhatsApp Business Cloud API (officiel)
    // - Twilio
    // - CallMeBot (gratuit pour test)
    // L'exemple ci-dessous utilise CallMeBot (inscription gratuite sur callmebot.com)

    // 👇 Appel réel à l'API (décommente après avoir configuré)
    // await axios.get(url);

    console.log("Message envoyé (simulation) :", whatsappMessage);

    // Pour l'instant, on simule un succès
    return NextResponse.json({ success: true, message: "Message reçu et envoyé sur WhatsApp" });
    
  } catch (error) {
    console.error("Erreur API WhatsApp :", error);
    return NextResponse.json(
      { error: "Erreur interne lors de l'envoi" },
      { status: 500 }
    );
  }
}