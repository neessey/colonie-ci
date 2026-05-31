/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
  weight: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalPriceFormatted: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger le panier depuis localStorage au démarrage (une seule fois)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
    }
    setIsInitialized(true);
  }, []); // Dépendances vides pour ne s'exécuter qu'une fois

  // Sauvegarder le panier dans localStorage (seulement quand items change et que le panier est initialisé)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du panier:", error);
      }
    }
  }, [items, isInitialized]);

  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/\s/g, "").replace("FCFA", ""));
  };

  const addToCart = useCallback((product: any, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: parsePrice(product.price),
        priceFormatted: product.price,
        weight: product.weight,
        image: product.image,
        quantity: quantity
      }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const getTotalPriceFormatted = useCallback(() => {
    return `${getTotalPrice().toLocaleString()} FCFA`;
  }, [getTotalPrice]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalPriceFormatted
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice, getTotalPriceFormatted]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}