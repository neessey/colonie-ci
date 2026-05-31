/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(req: NextRequest) {
  try {
    const { amount, items, customerInfo } = await req.json();

    // Convertir FCFA en centimes (car Stripe utilise la plus petite unité monétaire)
    // Note: Le FCFA n'a pas de centimes, donc on utilise l'unité de base
    const amountInBaseUnit = amount;

    // Créer l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInBaseUnit,
      currency: "xof", // Code ISO pour le FCFA
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
        }))),
        customer_email: customerInfo?.email || "",
        customer_phone: customerInfo?.phone || "",
      },
      receipt_email: customerInfo?.email,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}